import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsUUID, Max, Min } from 'class-validator';
import { v4 as uuidV4 } from 'uuid';

export class RemoveCardInDeckDto {
  @ApiProperty({
    description: 'Informe o id da carta.',
    example: uuidV4(),
  })
  @IsUUID()
  @IsNotEmpty({ message: 'informe o id da carta' })
  cardId: string;

  @ApiProperty({
    description: 'Informe o nome do deck deseja remover a carta.',
    example: 'Metalfoes Deck',
  })
  @IsString()
  @IsNotEmpty({
    message: 'Informe o nome do deck que deseja remover a carta',
  })
  nameDeck: string;

  @ApiProperty({
    description: 'informe a quantidade de cartas a serem removidas.',
    example: 2,
  })
  @IsInt()
  @Min(1)
  @Max(3)
  @IsNotEmpty({ message: 'informe a quantidade de cartas' })
  amount: number;
}
