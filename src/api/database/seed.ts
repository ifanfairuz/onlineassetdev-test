import 'dotenv/config'
import { closeConnection, getConnection } from './connection.ts'
import { seedProductsData } from './seeders/product.seeder.ts'
import { seedUsersData } from './seeders/user.seeder.ts'

const db = await getConnection()

try {
  await db.query('BEGIN')

  await seedUsersData(db)
  await seedProductsData(db)

  await db.query('COMMIT')
} catch (error) {
  await db.query('ROLLBACK')
  throw error
} finally {
  await db.release()
  await closeConnection()
}
