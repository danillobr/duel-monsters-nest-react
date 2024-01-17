import { api } from '../lib/axios'

export interface createUser {
  name: string
  email: string
  username: string
  password: string
  passwordConfirmation: string
}

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

export async function signup(data: createUser) {
  try {
    const response = await api.post('auth/signup', data)
    return response.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          console.error('Erro de solicitação inválida (status 400):', error)
          // Tratar o erro de solicitação inválida
          break

        case 409:
          console.error('Erro de conflito (status 409):', error)
          // Tratar o erro de conflito (email ou username já em uso)
          break

        case 422:
          console.error('Erro de entidade não processável (status 422):', error)
          // Tratar o erro de entidade não processável
          break

        case 500:
          console.error('Erro interno do servidor (status 500):', error)
          // Tratar o erro interno do servidor
          break

        default:
          console.error('Erro desconhecido:', error)
          // Tratar outros erros
          break
      }
    } else {
      console.error('Erro desconhecido (sem resposta):', error)
    }
  }
}
