const router = require('express').Router();
const Database = require('better-sqlite3');
const db = new Database('tokki.db');

router.get('/', (req, res) => {
    const stmt = db.prepare('SELECT * FROM mails');
    const mails = stmt.all();
    res.json(mails);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const stmt = db.prepare(`SELECT * FROM origins WHERE mail_id = ?`);
    const recipients = stmt.all(id);
    res.json(recipients);
});

module.exports = router;
