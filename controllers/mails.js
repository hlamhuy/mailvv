import Database from "better-sqlite3";
import getContent from "../utils/content.js";
import express from "express";
const router = express.Router();
const db = new Database("tokki.db");


router.get("/", (req, res) => {
  const stmt = db.prepare("SELECT * FROM mails");
  const mails = stmt.all();
  res.json(mails);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare(`SELECT * FROM origins WHERE mail_id = ?`);
  const recipients = stmt.all(id);
  res.json(recipients);
});

router.post("/content/:uid", async (req, res) => {
  const { uid } = req.params;
  const { account_id } = req.body;
  const account = db
    .prepare(`SELECT * FROM accounts WHERE id = ?`)
    .get(account_id);
  const content = await getContent(uid, account);
  //console.log(content);
  res.json(content);
});
export default router;
