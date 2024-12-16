const Database = require('better-sqlite3');

const initializeDatabase = () => {
    const db = new Database('accounts.db', { verbose: console.log });
    db.exec(`
        CREATE TABLE IF NOT EXISTS accounts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user TEXT NOT NULL,
            pass TEXT NOT NULL,
            domain TEXT NOT NULL,
            alive INTEGER,
            last_synced TIMESTAMP,
            UNIQUE(user)          
        )
    `);

    db.exec(`
        CREATE TABLE IF NOT EXISTS mails (
            id INTEGER PRIMARY KEY AUTOINCREMENT,            
            subject TEXT NOT NULL,
            date TIMESTAMP NOT NULL,            
        )
    `);

    db.exec(`
        CREATE TABLE IF NOT EXISTS origins (
            CREATE TABLE IF NOT EXISTS origins (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            mail_id INTEGER NOT NULL,
            account_id INTEGER NOT NULL,
            pid INTEGER NOT NULL,
            FOREIGN KEY (mail_id) REFERENCES mails(id),
            FOREIGN KEY (account_id) REFERENCES accounts(id)
        )
        )
    `);
};

module.exports = { initializeDatabase };
