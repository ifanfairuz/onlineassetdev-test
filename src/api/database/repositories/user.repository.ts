import { User } from '#shared/model/user'
import { Connection, ConnectionOrPool } from '../connection.ts'

export async function selectUsersWithPagination(
  db: ConnectionOrPool,
  page = 1,
  per_page = 10,
  search?: string,
): Promise<User[]> {
  let sql = 'SELECT * FROM users'
  const params: (number | string)[] = [per_page, (page - 1) * per_page]
  if (search?.length) {
    sql += ` WHERE name ILIKE $3 OR email ILIKE $3`
    params.push(`%${search}%`)
  }
  sql += ' ORDER BY id ASC LIMIT $1 OFFSET $2;'

  const result = await db.query(sql, params)

  const users: User[] = []
  for (const row of result.rows) {
    users.push({
      id: row.id,
      name: row.name,
      email: row.email,
      created_at: row.created_at.toISOString(),
      updated_at: row.updated_at.toISOString(),
    })
  }

  return users
}

export async function countUsers(db: ConnectionOrPool, search?: string): Promise<number> {
  let sql = 'SELECT COUNT(*) AS count FROM users'
  const params: (number | string)[] = []
  if (search?.length) {
    sql += ` WHERE name ILIKE $1 OR email ILIKE $1`
    params.push(`%${search}%`)
  }

  const result = await db.query(sql, params)
  return parseInt(result.rows[0].count)
}

export async function insertUser(
  db: Connection,
  user: Pick<User, 'name' | 'email'>,
): Promise<User> {
  const result = await db.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email, created_at, updated_at;',
    [user.name, user.email],
  )

  return {
    id: result.rows[0][0],
    name: result.rows[0][1],
    email: result.rows[0][2],
    created_at: result.rows[0][3],
    updated_at: result.rows[0][4],
  }
}
