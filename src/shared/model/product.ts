export interface Product {
  id: number
  name: string
  price: number
  category: string
  created_at: Date
  updated_at: Date
}

export type ProductListPaginated = {
  data: Product[]
  meta: {
    current_page: number
    total_pages: number
    per_page: number
    total: number
    fetched_at?: Date | null
  }
}

export type CreateProductPayload = Pick<Product, 'name' | 'price' | 'category'>
