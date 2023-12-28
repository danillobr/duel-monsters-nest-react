import { api } from '../lib/axios'

export async function authWithGoogle() {
  try {
    const response = api.get('auth/google')
    return response
  } catch (error) {
    // Capturar e relatar o erro
    console.error('Erro ao se cadastrar:', error)
    throw error // Rejogar o erro para que possa ser tratado pelo código que chama a função
  }
}
