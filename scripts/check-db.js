#!/usr/bin/env node
const { Client } = require('pg');
const process = require('process');

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('Missing DATABASE_URL. Set it to your Railway PostgreSQL connection string.');
    process.exit(1);
  }

  const client = new Client({ connectionString });
  try {
    await client.connect();
    console.log('Connected to database. Checking tables...');
    const { rows } = await client.query(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;`
    );

    if (!rows.length) {
      console.warn('No tables found. Run "npm run db:setup" to apply the schema.');
      return;
    }

    console.log('Public tables:');
    rows.forEach((row) => console.log(`- ${row.table_name}`));
  } catch (error) {
    console.error('Failed to check database:', error.message);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

main();
