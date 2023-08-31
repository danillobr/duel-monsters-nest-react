import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AddCardDeckUserDto {
  @IsUUID()
  @IsNotEmpty({ message: 'informe o id da carta' })
  cardId: string;

  @IsString()
  @IsNotEmpty({
    message: 'Informe o nome do deck que deseja adicionar a carta',
  })
  nameDeck: string;
}
