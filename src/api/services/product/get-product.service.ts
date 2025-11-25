import { ProductListPaginated } from '#shared/model/product'
import { pool } from '../../database/connection.ts'
import {
  countProducts,
  selectProductsWithPagination,
} from '../../database/repositories/product.repository.ts'

export async function getProducts(
  page = 1,
  per_page = 10,
  search?: string,
): Promise<ProductListPaginated> {
  const products = await selectProductsWithPagination(pool, page, per_page, search)
  const total = await countProducts(pool, search)

  const total_pages = Math.ceil(total / per_page)

  return {
    data: products,
    meta: {
      current_page: page,
      total_pages: total_pages,
      per_page: per_page,
      total: total,
      fetched_at: new Date(),
    },
  }
}
