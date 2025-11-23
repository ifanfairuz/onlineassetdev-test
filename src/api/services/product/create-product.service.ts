import { CreateProductPayload, Product } from '../../../shared/model/product.ts'

export async function createProduct({
  name,
  price,
  category,
}: CreateProductPayload): Promise<Product> {
  return await {
    id: 1,
    name,
    price,
    category,
    created_at: new Date(),
    updated_at: new Date(),
  }
}
