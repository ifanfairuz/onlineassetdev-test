import { Router } from 'express'
import { createUserHandler, getUsersHandler } from '../controller/user.controller.ts'

export function createUserApi(router: Router) {
  router
    .route('/users')
    .get(getUsersHandler)
    .post(createUserHandler)
}
