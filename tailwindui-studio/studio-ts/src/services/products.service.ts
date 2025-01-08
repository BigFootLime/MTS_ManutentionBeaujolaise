import { BASE_URL, CallApi } from '../utils/CallApi'

export interface Product {
  _id: string // MongoDB ObjectId
  name: string
  priceHT: number // Prix HT
  annonceType?: string // Vente / Offre
  model?: string // Modèle
  condition?: string // Etat
  year?: number // Année
  hours?: number // Heures
  type?: string // Type
  mastType?: string // Type de mât
  liftingCapacity?: string // Capacité de levage
  liftingHeight?: string // Hauteur de levage
  tireType?: string // Type de pneu
  availability?: string // Disponibilité
  comment?: string // Commentaire
  brand?: string // Marque
  rubric?: string // Rubrique
  images: { primary: boolean; fileId: string }[] // Images
}

export async function getProducts(
  params: { page?: number; limit?: number } = {},
): Promise<Product[]> {
  const query = new URLSearchParams(params as Record<string, string>).toString()
  const url = `${BASE_URL}/products${query ? `?${query}` : ''}`
  try {
    return await CallApi('GET', url)
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function getProductById(id: number): Promise<Product> {
  const url = `${BASE_URL}/products/${id}`
  try {
    return await CallApi('GET', url)
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error)
    throw error
  }
}

export async function createProduct(product: Product): Promise<Product> {
  const url = `${BASE_URL}/products`
  return await CallApi('POST', url, product)
}

export async function updateProduct(
  id: number,
  product: Partial<Product>,
): Promise<Product> {
  const url = `${BASE_URL}/products/${id}`
  return await CallApi('PUT', url, product)
}

export async function deleteProduct(id: number): Promise<void> {
  const url = `${BASE_URL}/products/${id}`
  await CallApi('DELETE', url)
}

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
}
