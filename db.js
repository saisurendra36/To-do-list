// db.js
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.sqlite");

// Create table if not exists
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0
    )
  `);
});

module.exports = db;
