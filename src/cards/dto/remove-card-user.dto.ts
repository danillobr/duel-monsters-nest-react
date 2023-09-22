import { IsInt, IsNotEmpty, IsString, IsUUID, Max, Min } from 'class-validator';

export class RemoveCardInUserDto {
  @IsUUID()
  @IsNotEmpty({ message: 'informe o id da carta' })
  cardId: string;

  @IsInt()
  @Min(1)
  @IsNotEmpty({ message: 'informe a quantidade de cartas' })
  amount: number;
}
