import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, IsString } from 'class-validator';

export class CreateUserWithGoogleDto {
  @ApiProperty({
    description:
      'O nome é utilizado para qualquer coisa (Perfil, Home Page, etc) que precise exibir dados do usuário',
    example: 'Pantera Rodrigues Abreu',
  })
  @IsString()
  @IsNotEmpty({
    message: 'Informe o nome do usuário',
  })
  @MaxLength(200, {
    message: 'O nome deve ter menos de 200 caracteres',
  })
  name: string;

  @ApiProperty({
    description:
      'O email é utilizado para fazer login e recuperar senha de usuário',
    example: 'email@gmail.com',
  })
  @IsNotEmpty({
    message: 'Informe um endereço de email',
  })
  @IsEmail(
    {},
    {
      message: 'Informe um endereço de email válido',
    },
  )
  @MaxLength(200, {
    message: 'O endereço de email deve ter menos de 200 caracteres',
  })
  email: string;
}
