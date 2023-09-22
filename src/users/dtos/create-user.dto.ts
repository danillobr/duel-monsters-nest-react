import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Matches,
  IsString,
} from 'class-validator';

export class CreateUserDto {
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

  @ApiProperty({
    description:
      'Senha utilizada no login, deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número ou um símbolo',
    example: 'Senha321!',
  })
  @IsString()
  @IsNotEmpty({
    message: 'Informe uma senha',
  })
  @MinLength(6, {
    message: 'A senha deve ter no mínimo 6 caracteres',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número ou um símbolo',
  })
  password: string;

  @ApiProperty({
    description: 'Confirmação de senha deve ser idêntica a senha escolhida.',
    example: 'Senha321!',
  })
  @IsString()
  @IsNotEmpty({
    message: 'Informe a confirmação de senha',
  })
  @MinLength(6, {
    message: 'A confirmação de senha deve ter no mínimo 6 caracteres',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número ou um símbolo',
  })
  passwordConfirmation: string;
}
