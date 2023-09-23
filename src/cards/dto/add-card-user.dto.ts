import { Type } from '@nestjs/class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsUUID,
  Min,
} from 'class-validator';
import { v4 as uuidV4 } from 'uuid';

class ItemsCardsDto {
  @ApiProperty({
    description: 'Informe o id da carta.',
    example: uuidV4(),
  })
  @IsUUID()
  @IsNotEmpty({ message: 'informe o id da carta' })
  cardId: string;

  @ApiProperty({
    description: 'informe a quantidade de cartas a serem adicionadas.',
    example: 2,
  })
  @IsInt()
  @Min(1)
  @IsNotEmpty({ message: 'informe a quantidade de cartas' })
  amount: number;
}

export class AddCardInUserDto {
  @ApiProperty({
    description:
      'Lista de ids e quantidade de cartas para adicionar na lista de cartas do usuário.',
    type: ItemsCardsDto,
    example: [
      {
        cardId: '50d2bd0a-163a-4122-8d6e-69846e9d83c7',
        amount: 2,
      },
      {
        cardId: 'bd5f184a-9aaa-4076-86dc-037b7e4e63c2',
        amount: 1,
      },
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemsCardsDto)
  itemsCards: ItemsCardsDto[];
}
