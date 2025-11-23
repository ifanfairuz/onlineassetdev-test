import type { CreateProductPayload, Product, ProductList } from '../../shared/model/product'

export async function getProducts(page = 1, per_page = 10): Promise<ProductList> {
  const res = await fetch(`/api/products?page=${page}&per_page=${per_page}`, {
    headers: {
      Accept: 'application/json',
    },
  })

  if (res.ok) {
    const data = await res.json()
    return {
      data: data.data.map((product: Record<string, unknown>) => ({
        ...product,
        created_at: new Date(product.created_at as string),
        updated_at: new Date(product.updated_at as string),
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

export async function createProduct(product: CreateProductPayload): Promise<Product> {
  return await fetch('/api/products', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  }).then((res) => res.json())
}
