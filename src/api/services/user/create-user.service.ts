import { CreateUserPayload, User } from '../../../shared/model/user.ts'
import { getConnection } from '../../database/connection.ts'
import { insertUser } from '../../database/repositories/user.repository.ts'

export async function createUser({ name, email }: CreateUserPayload): Promise<User> {
  const db = await getConnection()
  const user = await insertUser(db, { name, email })
  await db.release()

  return user
}
