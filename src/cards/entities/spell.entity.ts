import { Column, Entity, OneToMany } from 'typeorm';
import { Card } from './card.entity';
import { SpellSymbol } from '../enum/spell-symbol.enum';
import { SpellUser } from '../../users/entities/spell-user.entity';
import { SpellDeck } from '../../decks/entities/spell-deck.entity';

@Entity('spells')
export class Spell extends Card {
  @Column({ nullable: false, type: 'int' })
  effectDuration: number;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  symbol: SpellSymbol;

  @OneToMany(() => SpellUser, (spellUser) => spellUser.spell, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  spellsUser: SpellUser[];

  @OneToMany(() => SpellDeck, (spellDeck) => spellDeck.spell, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  spellsDeck: SpellDeck[];
}
