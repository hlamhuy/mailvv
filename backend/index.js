const express = require('express');
const accountsRouter = require('./controllers/accounts.js');
const mailsRouter = require('./controllers/mails.js');
const { initializeDatabase } = require('./utils/db');

const app = express();
const port = 3000;

initializeDatabase();

app.use(express.json({ limit: '50mb' }));
app.use('/api/accounts', accountsRouter);
app.use('/api/mails', mailsRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
