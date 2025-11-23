import { Pool, PoolClient } from 'pg'

export const pool = new Pool()

export type Connection = PoolClient
export type ConnectionOrPool = Connection | Pool

export async function getConnection(): Promise<Connection> {
  return await pool.connect()
}

export async function closeConnection() {
  await pool.end()
}
