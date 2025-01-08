import { BASE_URL, CallApi } from '../utils/CallApi'

// Product type definition
export interface Product {
  id?: number
  name: string
  price: number
  description?: string
  [key: string]: any
}

// GET all products
export async function getProducts(): Promise<Product[]> {
  const url = `${BASE_URL}/products`
  return await CallApi('GET', url)
}

// GET product by ID
export async function getProductById(id: number): Promise<Product> {
  const url = `${BASE_URL}/products/${id}`
  return await CallApi('GET', url)
}

// POST create new product
export async function createProduct(product: Product): Promise<Product> {
  const url = `${BASE_URL}/products`
  return await CallApi('POST', url, product)
}

// PUT update product by ID
export async function updateProduct(
  id: number,
  product: Product,
): Promise<Product> {
  const url = `${BASE_URL}/products/${id}`
  return await CallApi('PUT', url, product)
}

// DELETE product by ID
export async function deleteProduct(id: number): Promise<void> {
  const url = `${BASE_URL}/products/${id}`
  return await CallApi('DELETE', url)
}
