import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Check,
} from 'typeorm';

import { Deck } from './deck.entity';
import { Trap } from '../../cards/entities/trap.entity';
import { v4 as uuidV4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

@Entity('traps_decks')
@Check(`"amount" >= 0 AND "amount" <= 3`)
export class TrapDeck extends BaseEntity {
  @ApiProperty({ example: uuidV4() })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 2 })
  @Column({ nullable: false, type: 'int' })
  amount: number;

  @ManyToOne(() => Deck, (deck) => deck.trapsDeck, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  deck: Deck;

  @ApiProperty({ type: () => Trap })
  @ManyToOne(() => Trap, (trap) => trap.trapsDeck, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  trap: Trap;
}
