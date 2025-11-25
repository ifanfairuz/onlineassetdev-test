import type { AxiosInstance } from 'axios'
import type { CreateProductPayload, Product, ProductListPaginated } from '@shared/model/product'

export class ProductApi {
  public constructor(public readonly _http: AxiosInstance) {}

  /**
   * Get all products
   *
   * @param page
   * @param per_page
   * @returns
   */
  public async getProducts(
    page: number,
    per_page: number,
    search?: string,
  ): Promise<ProductListPaginated> {
    const params: Record<string, string> = {
      page: page.toString(),
      per_page: per_page.toString(),
    }

    if (search?.length) {
      params['search'] = search
    }

    const { data } = await this._http.get(`/api/products`, { params })
    return {
      data: data.data.map((product: Record<string, unknown>) => ({
        ...product,
        created_at: new Date(product.created_at as string),
        updated_at: new Date(product.updated_at as string),
      })),
      meta: {
        ...data.meta,
        fetched_at: new Date(data.meta.fetched_at),
      },
    }
  }

  /**
   * Create a product
   *
   * @param product - payload data
   * @returns product
   */
  public async createProduct(product: CreateProductPayload): Promise<Product> {
    const { data } = await this._http.post('/api/products', product)
    return data
  }
}
