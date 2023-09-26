import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidV4 } from 'uuid';
import { SpellDeck } from '../entities/spell-deck.entity';
import { MonsterDeck } from '../entities/monster-deck.entity';
import { TrapDeck } from '../entities/trap-deck.entity';

class DeckDto {
  @ApiProperty({ example: uuidV4() })
  id: string;

  @ApiProperty({
    example: 'Metalfoes Deck',
  })
  name: string;

  @ApiProperty({ example: [] })
  spellsDeck: SpellDeck[];

  @ApiProperty({ example: [] })
  trapsDeck: TrapDeck[];

  @ApiProperty({ example: [] })
  MonstersDeck: MonsterDeck[];
}

export class ReturnCreateDeckDto {
  @ApiProperty({
    type: DeckDto,
  })
  deck: DeckDto;

  @ApiProperty({
    example: 'Deck criado com sucesso.',
  })
  message: string;
}
