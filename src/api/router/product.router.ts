import { Router } from 'express'
import { createProductHandler, getProductsHandler } from '../controller/product.controller.ts'

export function createProductApi(router: Router) {
  router
    .route('/products')
    .get(getProductsHandler)
    .post(createProductHandler)
}
