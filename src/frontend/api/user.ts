import type { AxiosInstance } from 'axios'
import type { CreateUserPayload, User, UserListPaginated } from '@shared/model/user'

export class UserApi {
  public constructor(private readonly _http: AxiosInstance) {}

  /**
   * Get all users
   *
   * @param page
   * @param per_page
   * @returns
   */
  public async getUsers(page: number, per_page: number): Promise<UserListPaginated> {
    const { data } = await this._http.get(`/api/users?page=${page}&per_page=${per_page}`)
    return {
      data: data.data.map((user: Record<string, unknown>) => ({
        ...user,
        created_at: new Date(user.created_at as string),
        updated_at: new Date(user.updated_at as string),
      })),
      meta: {
        ...data.meta,
        fetched_at: new Date(data.meta.fetched_at),
      },
    }
  }

  /**
   * Create a user
   *
   * @param payload - payload data
   * @returns user
   */
  public async createUser(payload: CreateUserPayload): Promise<User> {
    const { data } = await this._http.post('/api/users', payload)
    return data
  }
}
