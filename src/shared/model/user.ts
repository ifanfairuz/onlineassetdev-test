export interface User {
  id: number
  name: string
  email: string
  created_at: Date
  updated_at: Date
}

export type UserListPaginated = {
  data: User[]
  meta: {
    current_page: number
    total_pages: number
    per_page: number
    total: number
    fetched_at?: Date | null
  }
}

export type CreateUserPayload = Pick<User, 'name' | 'email'>
