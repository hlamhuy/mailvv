const router = require('express').Router();
const Database = require('better-sqlite3');
const db = new Database('tokki.db');

router.get('/', (req, res) => {
    const stmt = db.prepare('SELECT * FROM mails');
    const mails = stmt.all();
    res.json(mails);
});

module.exports = router;