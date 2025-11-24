import { inject, provide } from 'vue'
import { ProductApi } from './product'
import { UserApi } from './user'

export class ApiClient {
  public readonly user: UserApi
  public readonly product: ProductApi

  public constructor() {
    this.user = new UserApi()
    this.product = new ProductApi()
  }
}

const KEY = Symbol('api-client')

export function provideApiClient() {
  provide(KEY, new ApiClient())
}

export function useApiClient() {
  return inject(KEY, new ApiClient())
}
