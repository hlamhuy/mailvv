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
};

module.exports = { initializeDatabase };
