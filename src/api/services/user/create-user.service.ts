import { CreateUserPayload, User } from '#shared/model/user'
import { DatabaseError } from 'pg'
import { getConnection } from '../../database/connection.ts'
import { insertUser } from '../../database/repositories/user.repository.ts'
import { DuplicateEmailException } from './exceptions/DuplicateEmailException.ts'

export async function createUser({ name, email }: CreateUserPayload): Promise<User> {
  try {
    const db = await getConnection()
    const user = await insertUser(db, { name, email })
    await db.release()

    return user
  } catch (error) {
    if (
      error instanceof DatabaseError &&
      error.code === '23505' &&
      error.constraint === 'users_email_unique_index'
    ) {
      throw new DuplicateEmailException()
    }

    throw error
  }
}
