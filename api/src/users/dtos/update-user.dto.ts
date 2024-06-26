import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../enum/user-roles.enum';
import { IsString, IsEmail, IsOptional } from 'class-validator';
export class UpdateUserDto {
  @ApiProperty({
    description: 'Nome atualizado do usuário.',
    required: false,
    example: 'Pantera Abreu',
  })
  @IsOptional()
  @IsString({
    message: 'Informe um nome de usuário válido',
  })
  name?: string;

  @ApiProperty({
    description: 'Email atualizado do usuário.',
    required: false,
    example: 'novoemail@email.com',
  })
  @IsOptional()
  @IsEmail(
    {},
    {
      message: 'Informe um endereço de email válido',
    },
  )
  email?: string;

  @ApiProperty({
    description: 'Tipo de usuário.',
    required: false,
    example: 'USER',
    enum: UserRole,
  })
  @IsOptional()
  role?: UserRole;

  @ApiProperty({
    description: 'Status do usuário',
    required: false,
    example: true,
  })
  @IsOptional()
  status?: boolean;
}
