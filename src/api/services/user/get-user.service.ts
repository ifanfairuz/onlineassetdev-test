import { UserListPaginated } from '../../../shared/model/user.ts'
import { pool } from '../../database/connection.ts'
import {
  countUsers,
  selectUsersWithPagination,
} from '../../database/repositories/user.repository.ts'

export async function getUsers(page = 1, per_page = 10): Promise<UserListPaginated> {
  const datas = await selectUsersWithPagination(pool, page, per_page)
  const total = await countUsers(pool)

  const total_pages = Math.ceil(total / per_page)

  return {
    data: datas,
    meta: {
      current_page: page,
      total_pages: total_pages,
      per_page: per_page,
      total: total,
      fetched_at: new Date(),
    },
  }
}
