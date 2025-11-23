import 'dotenv/config'
import { readdir } from 'fs/promises'
import { join } from 'path'
import { readFileSync } from 'fs'
import { closeConnection, getConnection } from './connection.ts'

const db = await getConnection()

try {
  await db.query('BEGIN')

  // drop all tables
  if (process.argv.find((arg) => arg === '--drop')) {
    console.log('Dropping all tables...')

    await db.query('DROP TABLE IF EXISTS _migrations CASCADE;')
    await db.query('DROP TABLE IF EXISTS users CASCADE;')
    await db.query('DROP TABLE IF EXISTS products CASCADE;')

    console.log('\n✅ All tables dropped successfully')
  }

  // create migrations table
  await db.query(
    'CREATE TABLE IF NOT EXISTS _migrations (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL);',
  )

  // get all migrations
  const migrated = await db.query('SELECT name FROM _migrations;')
  const migrated_names = migrated.rows.map((row) => row.name)

  // scan migrations folder
  const migrations = await readdir(join(import.meta.dirname, '/migrations'), {
    withFileTypes: true,
  })

  // apply migrations
  for (const migration of migrations) {
    if (!migration.isFile() || !migration.name.endsWith('.sql')) {
      continue
    }

    if (migrated_names.includes(migration.name)) {
      continue
    }

    const query = readFileSync(join(migration.parentPath, migration.name), 'utf-8').split(';\n')
    for (const sql of query) {
      await db.query(sql)
    }
    await db.query('INSERT INTO _migrations (name) VALUES ($1)', [migration.name])
    console.log(`  ✅ Applied migration ${migration.name}`)
  }

  await db.query('COMMIT')
  await db.release()

  console.log('✅ Migrations applied successfully')
} catch (error: unknown) {
  await db.query('ROLLBACK')
  await db.release(error as Error)
  throw error
} finally {
  await closeConnection()
}
