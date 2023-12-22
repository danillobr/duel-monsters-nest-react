import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedResponseDto {
  @ApiProperty({ example: 401, description: 'Status code' })
  statusCode: number;

  @ApiProperty({ example: 'Unauthorized', description: 'Mensagem de erro' })
  message: string;
}
