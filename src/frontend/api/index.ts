import { inject, provide } from 'vue'
import axios, { type AxiosInstance } from 'axios'
import { ProductApi } from './product'
import { UserApi } from './user'
import { ValidationException } from '@shared/exceptions/ValidationException'
import { HttpException } from '@shared/exceptions/HttpException'
import { ClientErrorException } from '@shared/exceptions/ClientErrorException'

class ApiClient {
  private readonly _http: AxiosInstance
  public readonly user: UserApi
  public readonly product: ProductApi

  public constructor() {
    this._http = this.createHttpClient()
    this.user = new UserApi(this._http)
    this.product = new ProductApi(this._http)
  }

  private createHttpClient() {
    const http = axios.create({
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    http.interceptors.response.use(
      (response) => response,
      (error) => {
        if (!axios.isAxiosError(error)) {
          return Promise.reject(new ClientErrorException(String(error)))
        }

        if (!error.response) {
          return Promise.reject(new ClientErrorException(error.message))
        }

        if (error.response.status === 400) {
          if (error.response.data?.message === 'Validation Error') {
            return Promise.reject(new ValidationException(error.response.data.errors))
          }

          return Promise.reject(new HttpException(error.response.status, 'Bad Request'))
        }

        return Promise.reject(new HttpException(error.response.status, 'Internal Server Error'))
      },
    )

    return http
  }
}

const KEY = Symbol('api-client')

export function provideApiClient() {
  provide(KEY, new ApiClient())
}

export function useApiClient() {
  return inject(KEY, new ApiClient())
}
