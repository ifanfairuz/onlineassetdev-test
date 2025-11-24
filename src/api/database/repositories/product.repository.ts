import { Product } from '../../../shared/model/product.ts'
import { Connection, ConnectionOrPool } from '../connection.ts'

export async function selectProductsWithPagination(
  db: ConnectionOrPool,
  page = 1,
  per_page = 10,
): Promise<Product[]> {
  const result = await db.query('SELECT * FROM products ORDER BY id ASC LIMIT $1 OFFSET $2;', [
    per_page,
    (page - 1) * per_page,
  ])

  const products: Product[] = []
  for (const row of result.rows) {
    products.push({
      id: row.id,
      name: row.name,
      price: row.price,
      category: row.category,
      created_at: row.created_at,
      updated_at: row.updated_at,
    })
  }

  return products
}

export async function countProducts(db: ConnectionOrPool): Promise<number> {
  const result = await db.query('SELECT COUNT(*) AS count FROM products;')

  return parseInt(result.rows[0].count)
}

export async function insertProduct(
  db: Connection,
  product: Pick<Product, 'name' | 'price' | 'category'>,
): Promise<Product> {
  const result = await db.query(
    'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING id, name, price, category, created_at, updated_at;',
    [product.name, product.price, product.category],
  )

  return {
    id: result.rows[0].id,
    name: result.rows[0].name,
    price: result.rows[0].price,
    category: result.rows[0].category,
    created_at: result.rows[0].created_at,
    updated_at: result.rows[0].updated_at,
  }
}
