import express, { json } from 'express';
import accountsRouter from './controllers/accounts.js';
import mailsRouter from './controllers/mails.js';
import initializeDatabase from './utils/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 11125;

initializeDatabase();

app.use(json({ limit: '50mb' }));
app.use('/api/accounts', accountsRouter);
app.use('/api/mails', mailsRouter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
