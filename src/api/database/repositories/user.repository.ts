import { User } from '#shared/model/user.ts'
import { Connection, ConnectionOrPool } from '../connection.ts'

export async function selectUsersWithPagination(
  db: ConnectionOrPool,
  page = 1,
  per_page = 10,
): Promise<User[]> {
  const result = await db.query('SELECT * FROM users ORDER BY id ASC LIMIT $1 OFFSET $2;', [
    per_page,
    (page - 1) * per_page,
  ])

  const users: User[] = []
  for (const row of result.rows) {
    users.push({
      id: row.id,
      name: row.name,
      email: row.email,
      created_at: row.created_at,
      updated_at: row.updated_at,
    })
  }

  return users
}

export async function countUsers(db: ConnectionOrPool): Promise<number> {
  const result = await db.query('SELECT COUNT(*) AS count FROM users;')

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
