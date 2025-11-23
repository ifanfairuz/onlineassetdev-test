import { RequestHandler } from 'express'
import z from 'zod'
import { getProducts } from '../services/product/get-product.service.ts'
import { createProduct } from '../services/product/create-product.service.ts'

export const getProductsHandler: RequestHandler = async (req, res) => {
  const schema = z.object({
    page: z.coerce.number().min(1).default(1).optional(),
    per_page: z.coerce.number().min(1).max(100).default(10).optional(),
  })

  const { page, per_page } = schema.parse(req.query)
  const response = await getProducts(page, per_page)

  return res.json({
    data: response.data.map((product) => ({
      ...product,
      created_at: product.created_at.toISOString(),
      updated_at: product.updated_at.toISOString(),
    })),
    meta: {
      ...response.meta,
      fetched_at: response.meta.fetched_at?.toISOString(),
    },
  })
}

export const createProductHandler: RequestHandler = async (req, res) => {
  const schema = z.object({
    name: z.string().min(1).max(255),
    price: z.number().min(1).max(1_000_000_000),
    category: z.string().min(1).max(255),
  })

  const payload = schema.parse(req.body)
  const user = await createProduct(payload)

  return res.json(user)
}
