import * as SQLite from 'expo-sqlite';

const DB_NAME = 'ghost-receipts.db';
const SCHEMA_VERSION = 1;
let database = null;

export function getDatabase() {
  if (!database) {
    database = SQLite.openDatabaseSync(DB_NAME);
  }
  return database;
}

export function closeDatabase() {
  if (database) {
    database.closeSync();
    database = null;
  }
}

function ensureSchema(db) {
  db.execSync(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS receipts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image_path TEXT,
      amount REAL NOT NULL DEFAULT 0,
      note TEXT,
      category TEXT,
      status TEXT NOT NULL DEFAULT 'ghost'
        CHECK (status IN ('ghost', 'exorcised', 'split', 'fused')),
      created_at INTEGER NOT NULL,
      exorcised_at INTEGER,
      parent_id INTEGER REFERENCES receipts(id) ON DELETE SET NULL,
      source_ids TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_receipts_status ON receipts(status);
    CREATE INDEX IF NOT EXISTS idx_receipts_created_at ON receipts(created_at);
    CREATE INDEX IF NOT EXISTS idx_receipts_parent_id ON receipts(parent_id);

    CREATE TABLE IF NOT EXISTS ghost_meta (
      key TEXT PRIMARY KEY,
      value TEXT
    );
  `);

  db.execSync(`
    INSERT OR IGNORE INTO ghost_meta (key, value)
    VALUES ('schema_version', '${SCHEMA_VERSION}');
  `);
}

export function initializeDatabase() {
  const db = getDatabase();
  ensureSchema(db);
  return db;
}

export default initializeDatabase;