const router = require('express').Router();
const Database = require('better-sqlite3');
const db = new Database('tokki.db');
const { getContent } = require('../utils/content');

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

router.post('/content/:uid', async (req, res) => {
    const { uid } = req.params;
    const { account_id } = req.body;
    const account = db
        .prepare(`SELECT * FROM accounts WHERE id = ?`)
        .get(account_id);
    const content = await getContent(uid, account);
    //console.log(content);
    res.json(content);
});
module.exports = router;
