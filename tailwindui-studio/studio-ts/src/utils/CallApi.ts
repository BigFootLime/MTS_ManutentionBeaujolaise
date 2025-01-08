// Base URL
export const BASE_URL = 'http://localhost:3000'

// API Call Function
export async function CallApi(
  method: string,
  url: string,
  body?: any,
  customHeaders?: Record<string, string>,
  type?: 'file',
): Promise<any> {
  try {
    const headers = {
      Accept: 'application/json',
      'Content-Type':
        type === 'file' ? 'multipart/form-data' : 'application/json',
      ...customHeaders,
    }

    const response = await fetch(url, {
      method,
      headers,
      body: body ? (type === 'file' ? body : JSON.stringify(body)) : undefined,
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(
        `HTTP Error: ${response.status} ${response.statusText} - ${error}`,
      )
    }

    // Automatically parse JSON if response type is JSON
    const contentType = response.headers.get('Content-Type')
    if (contentType && contentType.includes('application/json')) {
      return await response.json()
    }

    return response
  } catch (err) {
    console.error('Error in CallApi:', err)
    throw err
  }
}
