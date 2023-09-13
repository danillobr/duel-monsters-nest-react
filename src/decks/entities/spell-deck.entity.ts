import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Check,
} from 'typeorm';

import { Spell } from '../../cards/entities/spell.entity';
import { Deck } from './deck.entity';

@Entity('spells_decks')
@Check(`"amount" >= 0 AND "amount" <= 3`)
export class SpellDeck extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'int' })
  amount: number;

  @ManyToOne(() => Deck, (deck) => deck.spellsDeck, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  deck: Deck;

  @ManyToOne(() => Spell, (spell) => spell.spellsDeck, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  spell: Spell;
}
