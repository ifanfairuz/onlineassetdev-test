import type { CreateUserPayload, User, UserList } from '../../shared/model/user'

export async function getUsers(page = 1, per_page = 10): Promise<UserList> {
  const res = await fetch(`/api/users?page=${page}&per_page=${per_page}`, {
    headers: {
      Accept: 'application/json',
    },
  })

  if (res.ok) {
    const data = await res.json()
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

  if (res.status === 400) {
    throw new Error('Bad Request')
  }

  throw new Error('Internal Server Error')
}

export async function createUser(user: CreateUserPayload): Promise<User> {
  return await fetch('/api/users', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }).then((res) => res.json())
}
