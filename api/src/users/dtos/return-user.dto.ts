import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class ReturnUserDto {
  @ApiProperty({
    type: User,
  })
  user: User;

  @ApiProperty({
    example: 'Administrador cadastrado com sucesso.',
  })
  message: string;
}
