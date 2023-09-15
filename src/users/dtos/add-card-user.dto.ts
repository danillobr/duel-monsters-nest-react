import { Type } from '@nestjs/class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

class ItemsCardsDto {
  @IsUUID()
  @IsNotEmpty({ message: 'informe o id da carta' })
  cardId: string;

  @IsInt()
  @Min(1)
  @IsNotEmpty({ message: 'informe a quantidade de cartas' })
  amount: number;
}

export class AddCardUserDto {
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemsCardsDto)
  itemsCards: ItemsCardsDto[];
}
