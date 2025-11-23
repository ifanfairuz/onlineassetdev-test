import { UserList } from '../../../shared/model/user.ts'

export async function getUsers(page = 1, per_page = 10): Promise<UserList> {
  return await {
    data: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: 'Jane Doe',
        email: 'jane@example.com',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    meta: {
      current_page: page,
      total_pages: 1,
      per_page: per_page,
      total: 0,
      fetched_at: new Date(),
    },
  }
}
