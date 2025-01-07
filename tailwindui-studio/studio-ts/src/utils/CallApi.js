// Base URL
export const BASE_URL = 'http://localhost:3000'

// Appel API
export async function CallApi(method, url, body = false, _headers, type) {
  try {
    let headers = _headers || {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }

    const response = await fetch(url, {
      method,
      headers,
      body:
        body !== false
          ? type === 'file'
            ? body
            : JSON.stringify(body)
          : undefined,
    })

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status} ${response.statusText}`)
    }

    return response // Retourne l'objet `Response`
  } catch (err) {
    console.error('Erreur dans CallApi :', err)
    throw err
  }
}
