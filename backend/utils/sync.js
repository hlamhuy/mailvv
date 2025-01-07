const { ImapFlow } = require('imapflow');
const { getHost } = require('./host');

const syncAccount = async (db, accountId) => {
    const account = db
        .prepare('SELECT * FROM accounts WHERE id = ?')
        .get(accountId);
    const host = getHost(account.domain);

    const client = new ImapFlow({
        host: host,
        port: 993,
        secure: true,
        auth: {
            user: account.user,
            pass: account.pass,
        },
        //logger: false,
    });

    try {
        await client.connect();
        let lock = await client.getMailboxLock('INBOX', { readOnly: true });
        try {
            // get prev amount from db
            const status = await client.status('INBOX', { messages: true });
            const prevAmount = account.amount;
            const newAmount = status.messages;
            //console.log('Current prev amount: ', prevAmount);
            //console.log('Current new amount: ', newAmount);
            const start =
                prevAmount === 0 && newAmount > 200
                    ? newAmount - 200
                    : prevAmount + 1;
            //console.log('Start point: ', start);

            // fetch new messages
            let messages = await client.fetchAll(`${start}:*`, {
                uid: true,
                envelope: true,
            });

            // insert messages to db
            for (const mail of messages) {
                // check if mail already exists in db, then insert into mails table
                //console.log('Mail subject: ', mail.envelope.subject);
                let insertedId = mailInsert(db, mail);

                // insert into origins table
                originInsert(db, insertedId, accountId, mail);

                // update amount in accounts table
                db.prepare('UPDATE accounts SET amount = ? WHERE id = ?').run(
                    newAmount,
                    accountId
                );
            }
        } catch (e) {
            console.log('Error when fetching mails: ', e);
        } finally {
            lock.release();
        }
        return 1;
    } catch (e) {
        console.log('Error when connecting to IMAP server: ', e);
        if (e.responseStatus === 'NO') {
            return 0;
        }
    } finally {
        await client.logout();
    }
};

// insert into mails table if not existed and return mail id
const mailInsert = (db, mail) => {
    const existed = db
        .prepare('SELECT id FROM mails WHERE subject = ?')
        .get(mail.envelope.subject);
    const id = existed
        ? existed.id
        : db
              .prepare(
                  'INSERT INTO mails (subject, sender, most_recent) VALUES (?, ?, ?)'
              )
              .run(
                  mail.envelope.subject,
                  mail.envelope.from[0].name,
                  Math.floor(mail.envelope.date.getTime() / 1000)
              ).lastInsertRowid;

    return id;
};

// insert into origins table
const originInsert = (db, mailId, accountId, mail) => {
    db.prepare(
        'INSERT OR IGNORE INTO origins (mail_id, account_id, recipient, uid, date) VALUES (?, ?, ?, ?, ?)'
    ).run(
        mailId,
        accountId,
        mail.envelope.to[0].address,
        mail.uid,
        Math.floor(mail.envelope.date.getTime() / 1000)
    );

    db.prepare('UPDATE mails SET most_recent = ? WHERE id = ?').run(
        Math.floor(mail.envelope.date.getTime() / 1000),
        mailId
    );
};
module.exports = { syncAccount };
