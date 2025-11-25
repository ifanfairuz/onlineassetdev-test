import { UserListPaginated } from '#shared/model/user'
import { pool } from '../../database/connection.ts'
import {
  countUsers,
  selectUsersWithPagination,
} from '../../database/repositories/user.repository.ts'

export async function getUsers(
  page = 1,
  per_page = 10,
  search?: string,
): Promise<UserListPaginated> {
  const datas = await selectUsersWithPagination(pool, page, per_page, search)
  const total = await countUsers(pool, search)

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
