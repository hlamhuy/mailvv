const Database = require('better-sqlite3');

const initializeDatabase = () => {
    const db = new Database('tokki.db', { verbose: console.log });
    db.exec(`
        CREATE TABLE IF NOT EXISTS accounts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user TEXT NOT NULL,
            pass TEXT NOT NULL,
            domain TEXT NOT NULL,
            alive INTEGER,
            amount INTEGER DEFAULT 0,
            prev_amount INTEGER DEFAULT 0,
            last_synced TIMESTAMP,
            UNIQUE(user)          
        );
    `);

    db.exec(`
        CREATE TABLE IF NOT EXISTS mails (
            id INTEGER PRIMARY KEY AUTOINCREMENT,            
            subject TEXT NOT NULL,
            sender TEXT NOT NULL
        );
    `);

    db.exec(`
        CREATE TABLE IF NOT EXISTS origins (
            mail_id INTEGER NOT NULL,
            account_id INTEGER NOT NULL,
            uid INTEGER NOT NULL,
            date TIMESTAMP NOT NULL,
            PRIMARY KEY (mail_id, account_id, uid),
            FOREIGN KEY (mail_id) REFERENCES mails(id),
            FOREIGN KEY (account_id) REFERENCES accounts(id),
            UNIQUE(uid)
        );
    `);
};

module.exports = { initializeDatabase };
