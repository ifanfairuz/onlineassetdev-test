import { CreateUserPayload, User } from '../../../shared/model/user.ts'

export async function createUser({ name, email }: CreateUserPayload): Promise<User> {
  return await {
    id: 1,
    name,
    email,
    created_at: new Date(),
    updated_at: new Date(),
  }
}
