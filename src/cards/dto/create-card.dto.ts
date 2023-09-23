import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCardDto {
  @ApiProperty({
    description: 'Informe o nome da carta',
    example: 'Qualquer carta',
  })
  @IsString()
  @IsNotEmpty({
    message: 'Informe o nome da carta',
  })
  @IsString()
  @MaxLength(200, {
    message: 'O nome deve ter menos de 200 caracteres',
  })
  name: string;

  @ApiProperty({
    description: 'Descrição completa do que a carta faz.',
    example: 'Qualquer carta',
  })
  @IsString()
  @IsNotEmpty({
    message: 'Informe a descrição da carta',
  })
  @MaxLength(500, {
    message: 'A descrição deve ter menos de 500 caracteres',
  })
  description: string;

  @ApiProperty({
    description: 'Imagem da carta (essa parte ainda não está feita)',
    example: 'Imagem.png',
  })
  @IsNotEmpty({
    message: 'Imagem',
  })
  img: string;
}
