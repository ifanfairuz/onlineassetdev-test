import { ProductList } from '../../../shared/model/product.ts'

export async function getProducts(page = 1, per_page = 10): Promise<ProductList> {
  return await {
    data: [
      {
        id: 1,
        name: 'John Doe',
        price: 100,
        category: 'category',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: 'Jane Doe',
        price: 200,
        category: 'category',
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
