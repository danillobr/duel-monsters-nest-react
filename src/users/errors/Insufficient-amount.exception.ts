import { HttpException, HttpStatus } from '@nestjs/common';

export class InsufficientAmountException extends HttpException {
  constructor() {
    super(
      'Não é possível adicionar essa quantidade de cartas',
      HttpStatus.BAD_REQUEST,
    );
  }
}
