const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "db/db.json"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.post("/api/notes", (req, res) => {
  const parseN = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
  const newNote = req.body;
  newNote.id = uuidv4();
  parseN.push(newNote);
  fs.writeFileSync(
    './db/db.json',
    JSON.stringify(parseN, null, 2),

    (err) => (err ? console.error(err) : console.log("notes were updated"))
  );
  return;
});

app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
