import express, { json } from "express";
import accountsRouter from "./controllers/accounts.js";
import mailsRouter from "./controllers/mails.js";
import initializeDatabase from "./utils/db.js";

const app = express();
const port = 3000;

initializeDatabase();

app.use(json({ limit: "50mb" }));
app.use("/api/accounts", accountsRouter);
app.use("/api/mails", mailsRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
