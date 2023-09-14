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

@Entity('traps_decks')
@Check(`"amount" >= 0 AND "amount" <= 3`)
export class TrapDeck extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'int' })
  amount: number;

  @ManyToOne(() => Deck, (deck) => deck.trapsDeck, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  deck: Deck;

  @ManyToOne(() => Trap, (trap) => trap.trapsDeck, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  trap: Trap;
}
