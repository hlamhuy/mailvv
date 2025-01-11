import { ImapFlow } from 'imapflow';
import getHost from './host.js';
import { simpleParser } from 'mailparser';

const getContent = async (uid, account) => {
    const host = getHost(account.domain);

    const client = new ImapFlow({
        host: host,
        port: 993,
        secure: true,
        auth: {
            user: account.user,
            pass: account.pass,
        },
        logger: false,
    });

    await client.connect();
    let lock = await client.getMailboxLock('INBOX');

    try {
        let mail = await client.fetchOne(
            `${uid}`,
            { source: true },
            { uid: true }
        );
        const parsed = await simpleParser(mail.source);
        const content = parsed.html;
        //console.log(content);
        return content;
    } catch (e) {
        console.log('Error when fetching mail content: ', e);
        return e;
    } finally {
        lock.release();
        await client.logout();
    }
};

export default getContent;
