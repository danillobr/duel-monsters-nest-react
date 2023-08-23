import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty({
    message: 'Informe o nome da carta',
  })
  @MaxLength(200, {
    message: 'O nome deve ter menos de 200 caracteres',
  })
  name: string;

  @IsNotEmpty({
    message: 'Informe a descrição da carta',
  })
  @MaxLength(500, {
    message: 'A descrição deve ter menos de 500 caracteres',
  })
  description: string;

  img: string;
}
