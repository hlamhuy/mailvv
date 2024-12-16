const router = require('express').Router();
const Database = require('better-sqlite3');
const db = new Database('tokki.db');
const { ImapFlow } = require('imapflow');

const getHost = (domain) => {
    switch (domain) {
        case 'yahoo.com':
            return 'imap.mail.yahoo.com';
        case 'hotmail.com':
        case 'outlook.com':
            return 'imap-mail.outlook.com';
        case 'gmail.com':
            return 'imap.gmail.com';
        case 'icloud.com':
            return 'imap.mail.me.com';
        default:
            throw new Error(`Unsupported email domain: ${domain}`);
    }
};

const syncAccount = async (id) => {
    const stmt = db.prepare('SELECT * FROM accounts WHERE id = ?');
    const account = stmt.get(id);
    const host = getHost(account.domain);

    const client = new ImapFlow({
        host: host,
        port: 993,
        secure: true,
        auth: {
            user: account.user,
            pass: account.pass,
        },
    });

    try {
        await client.connect();
        return 1;
    } catch (error) {
        return 0;
    } finally {
        await client.logout();
    }
};

// Get all accounts
router.get('/', (req, res) => {
    const stmt = db.prepare('SELECT * FROM accounts');
    const accounts = stmt.all();
    res.json(accounts);
});

// Add a new account
router.post('/', (req, res) => {
    const { user, pass, domain, alive, last_synced } = req.body;
    const stmt = db.prepare(
        'INSERT INTO accounts (user, pass, domain, alive, last_synced) VALUES (?, ?, ?, ?, ?)'
    );
    try {
        const info = stmt.run(user, pass, domain, alive, last_synced);
        const newAccount = {
            id: info.lastInsertRowid,
            user,
            pass,
            domain,
            alive,
            last_synced,
        };
        res.status(201).json(newAccount);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete an account
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const stmt = db.prepare('DELETE FROM accounts WHERE id = ?');
    try {
        stmt.run(id);
        res.json({ message: 'Account deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete all accounts
router.delete('/', (req, res) => {
    const stmt = db.prepare('DELETE FROM accounts');
    try {
        stmt.run();
        res.json({ message: 'All accounts deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/sync/:id', async (req, res) => {
    const { id } = req.params;
    const stmt = db.prepare(
        'UPDATE accounts SET alive = ?, last_synced = ? WHERE id = ?'
    );
    try {
        const result = await syncAccount(id);
        stmt.run(result, Math.floor(Date.now() / 1000), id);
        const syncedAccount = db
            .prepare('SELECT * FROM accounts WHERE id = ?')
            .get(id);
        res.json(syncedAccount);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
