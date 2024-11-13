import { type Product, productsApi } from '../'

interface GetProductsOptions {
  filterKey?: string
}

const sleep = (seconds: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, seconds * 1000)
  })
}

export const getProducts = async ({
  filterKey,
}: GetProductsOptions): Promise<Product[]> => {
  // await sleep(2)
  const filterUrl = filterKey ? `category=${filterKey}` : ''
  const { data } = await productsApi.get<Product[]>(`/products?${filterUrl}`)
  return data
}

export const getProductById = async (id: number): Promise<Product> => {
  const { data } = await productsApi.get<Product>(`/products/${id}`)
  return data
}

export interface ProductLike {
  id?: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

export const createProduct = async (
  product: ProductLike
): Promise<ProductLike> => {
  await sleep(5)
  const { data } = await productsApi.post<ProductLike>(`/products`, product)
  return data
}
