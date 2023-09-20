import { IsInt, IsNotEmpty, IsString, IsUUID, Max, Min } from 'class-validator';

export class RemoveCardInDeckDto {
  @IsUUID()
  @IsNotEmpty({ message: 'informe o id da carta' })
  cardId: string;

  @IsString()
  @IsNotEmpty({
    message: 'Informe o nome do deck que deseja remover a carta',
  })
  nameDeck: string;

  @IsInt()
  @Min(1)
  @Max(3)
  @IsNotEmpty({ message: 'informe a quantidade de cartas' })
  amount: number;
}
