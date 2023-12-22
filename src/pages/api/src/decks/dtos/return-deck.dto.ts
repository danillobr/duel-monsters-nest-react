import { ApiProperty } from '@nestjs/swagger';
import { Deck } from '../entities/deck.entity';

export class ReturnDeckDto {
  @ApiProperty({
    type: Deck,
  })
  deck: Deck;

  @ApiProperty({
    example: 'Deck criado com sucesso.',
  })
  message: string;
}
