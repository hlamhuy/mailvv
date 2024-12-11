const express = require('express');
const accountsRouter = require('./controllers/accounts.js');
const { initializeDatabase } = require('./utils/db');

const app = express();
const port = 3000;

initializeDatabase();

app.use(express.json());
app.use('/api/accounts', accountsRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
