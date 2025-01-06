const Database = require('better-sqlite3');

const initializeDatabase = () => {
    const db = new Database('tokki.db');
    db.exec(`
        CREATE TABLE IF NOT EXISTS accounts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user TEXT NOT NULL,
            pass TEXT NOT NULL,
            domain TEXT NOT NULL,
            alive INTEGER,
            amount INTEGER DEFAULT 0,
            last_synced TIMESTAMP,
            UNIQUE(user)          
        );
    `);

    db.exec(`
        CREATE TABLE IF NOT EXISTS mails (
            id INTEGER PRIMARY KEY AUTOINCREMENT,            
            subject TEXT NOT NULL,
            sender TEXT NOT NULL,
            amount INTEGER DEFAULT 0,
            most_recent TIMESTAMP NOT NULL
            
        );
    `);

    db.exec(`
        CREATE TABLE IF NOT EXISTS origins (
            mail_id INTEGER NOT NULL,
            account_id INTEGER NOT NULL,
            recipient TEXT NOT NULL,
            uid INTEGER NOT NULL,
            date TIMESTAMP NOT NULL,
            PRIMARY KEY (mail_id, account_id, uid),
            FOREIGN KEY (mail_id) REFERENCES mails(id),
            FOREIGN KEY (account_id) REFERENCES accounts(id),
            UNIQUE(uid)
        );
    `);

    db.exec(`
        CREATE TRIGGER IF NOT EXISTS update_mail_info
        AFTER INSERT ON origins
        FOR EACH ROW
        BEGIN
            UPDATE mails
            SET 
                most_recent = NEW.date,
                amount = amount + 1
            WHERE id = NEW.mail_id;
        END;
    `);
};

module.exports = { initializeDatabase };
