import { BASE_URL, CallApi } from '../utils/CallApi'

// GET
export async function getProducts() {
  const url = `${BASE_URL}/products` // Assurez-vous que l'URL est correcte
  const response = await CallApi('GET', url)
  return response // Retourne les données JSON directement
}

// GET by ID
export async function getProductById(id) {
  const url = `${BASE_URL}/products/${id}`
  const response = await CallApi('GET', url)
  return response
}

// POST
export async function createProduct(product) {
  const url = `${BASE_URL}/products`
  const response = await CallApi('POST', url, product)
  return response
}

// PUT
export async function updateProduct(id, product) {
  const url = `${BASE_URL}/products/${id}`
  const response = await CallApi('PUT', url, product)
  return response
}

// DELETE
export async function deleteProduct(id) {
  const url = `${BASE_URL}/products/${id}`
  const response = await CallApi('DELETE', url)
  return response
}
