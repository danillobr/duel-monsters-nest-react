import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCardDto {
  @IsString()
  @IsNotEmpty({
    message: 'Informe o nome da carta',
  })
  @IsString()
  @MaxLength(200, {
    message: 'O nome deve ter menos de 200 caracteres',
  })
  name: string;

  @IsString()
  @IsNotEmpty({
    message: 'Informe a descrição da carta',
  })
  @MaxLength(500, {
    message: 'A descrição deve ter menos de 500 caracteres',
  })
  description: string;

  @IsNotEmpty({
    message: 'Imagem',
  })
  img: string;
}
