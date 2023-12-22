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
import { v4 as uuidV4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

@Entity('spells_decks')
@Check(`"amount" >= 0 AND "amount" <= 3`)
export class SpellDeck extends BaseEntity {
  @ApiProperty({ example: uuidV4() })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 3 })
  @Column({ nullable: false, type: 'int' })
  amount: number;

  @ManyToOne(() => Deck, (deck) => deck.spellsDeck, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  deck: Deck;

  @ApiProperty({ type: () => Spell })
  @ManyToOne(() => Spell, (spell) => spell.spellsDeck, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  spell: Spell;
}
