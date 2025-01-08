import { BASE_URL, CallApi } from '../utils/CallApi'

// Define Mail type for better type safety
export interface Mail {
  to: string // Recipient email address
  subject: string // Subject of the email
  body: string // Email content
  [key: string]: any // Allow additional optional fields
}

// POST: Send Mail
export async function sendMail(mail: Mail): Promise<any> {
  const url = `${BASE_URL}/mail`

  try {
    const response = await CallApi('POST', url, mail)
    return response // You can type this if you know the structure of the API response
  } catch (error) {
    console.error('Error in sendMail:', error)
    throw error
  }
}
