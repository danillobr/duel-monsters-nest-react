import { BackendError } from './backend-errors'

export class BadRequestError extends BackendError {
  constructor() {
    super(
      400,
      'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número ou um símbolo',
      'Bad Request',
    )
  }
}

export class ConflictError extends BackendError {
  constructor() {
    super(
      409,
      'O endereço de email é único, não podendo ter dois ou mais usuários com o mesmo email',
      'Conflict',
    )
  }
}

export class UnprocessableEntityError extends BackendError {
  constructor() {
    super(422, 'As senhas não conferem', 'Unprocessable Entity')
  }
}

export class InternalServerError extends BackendError {
  constructor() {
    super(
      500,
      'Erro ao salvar o usuário no banco de dados',
      'Internal Server Error',
    )
  }
}
