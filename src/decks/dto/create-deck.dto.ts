import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateDeckDto {
  @IsString()
  @IsNotEmpty({
    message: 'Informe o nome do deck',
  })
  @MaxLength(200, {
    message: 'O nome deve ter menos de 200 caracteres',
  })
  name: string;
}
