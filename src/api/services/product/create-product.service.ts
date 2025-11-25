import { CreateProductPayload, Product } from '#shared/model/product'
import { getConnection } from '../../database/connection.ts'
import { insertProduct } from '../../database/repositories/product.repository.ts'

export async function createProduct({
  name,
  price,
  category,
}: CreateProductPayload): Promise<Product> {
  const db = await getConnection()
  const product = await insertProduct(db, { name, price, category })
  await db.release()

  return product
}
