import { RequestHandler } from 'express'
import { getProducts } from '../services/product/get-product.service.ts'
import { createProduct } from '../services/product/create-product.service.ts'
import { paginationPayloadSchema } from '#shared/validation/pagination.schema'
import { createProductPayloadSchema } from '#shared/validation/product.schema'

/**
 * Get all products
 *
 * @param req
 * @param res
 * @returns
 */
export const getProductsHandler: RequestHandler = async (req, res) => {
  const { page, per_page, search } = paginationPayloadSchema.parse(req.query)
  const response = await getProducts(page, per_page, search)

  return res.json({
    data: response.data,
    meta: {
      ...response.meta,
      fetched_at: response.meta.fetched_at?.toISOString(),
    },
  })
}

/**
 * Create a product
 *
 * @param req
 * @param res
 * @returns
 */
export const createProductHandler: RequestHandler = async (req, res) => {
  const payload = createProductPayloadSchema.parse(req.body)
  const user = await createProduct(payload)

  return res.json(user)
}
