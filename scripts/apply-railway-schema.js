#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const { Client } = require('pg');

// Load env from .env.local or .env so local scripts work like Next.js runtime
try {
  require('dotenv').config({ path: path.join(process.cwd(), '.env.local') });
  require('dotenv').config();
} catch (err) {
  // dotenv optional if env already injected
}

async function main() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    console.error('Missing DATABASE_URL. Set it to your Railway PostgreSQL connection string.');
    process.exit(1);
  }

  const schemaPath = path.join(process.cwd(), 'scripts', 'railway-schema.sql');
  const sql = fs.readFileSync(schemaPath, 'utf8');

  const client = new Client({ connectionString });

  try {
    await client.connect();
    console.log(`Connected to database. Applying schema from ${schemaPath}...`);
    await client.query(sql);
    console.log('Schema applied successfully.');
  } catch (error) {
    console.error('Failed to apply schema:', error.message);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

main();
