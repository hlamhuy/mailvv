const router = require('express').Router();
const Database = require('better-sqlite3');
const db = new Database('accounts.db');

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
        stmt.run(user, pass, domain, alive, last_synced);
        res.status(201).json({ message: 'Account added successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
