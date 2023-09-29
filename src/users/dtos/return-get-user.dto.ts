import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class ReturnGetUserDto {
  @ApiProperty({
    type: User,
  })
  user: User;

  @ApiProperty({
    example: 'Usuário encontrado.',
  })
  message: string;
}
