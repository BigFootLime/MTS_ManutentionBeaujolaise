import axios from 'axios'
import { BASE_URL } from '../utils/CallApi'

// Define the types for better type safety
export interface UploadResponse {
  id: string // Example: file ID returned from the server
  url: string // Example: URL of the uploaded file
  [key: string]: any // Allow additional optional fields from server response
}

// GET file by ID
export async function GetPicture(id: string): Promise<Blob | null> {
  try {
    const response = await axios.get(`${BASE_URL}/files/${id}`, {
      responseType: 'blob', // Ensures the response is returned as a Blob
    })
    return response.data
  } catch (error) {
    console.error('Error while fetching the file:', error)
    return null
  }
}

// POST upload a file
export async function uploadFile(file: File): Promise<UploadResponse | null> {
  console.log('File being uploaded:', file)

  const formData = new FormData()
  formData.append('image', file)

  try {
    const response = await axios.post(`${BASE_URL}/files`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    console.log('File uploaded successfully:', response.data)
    return response.data
  } catch (error) {
    console.error('Error during file upload:', error)
    return null
  }
}
