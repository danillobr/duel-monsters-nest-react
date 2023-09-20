import { Column, Entity, OneToMany } from 'typeorm';
import { Card } from './card.entity';
import { SpellSymbol } from '../enum/spell-symbol.enum';
import { SpellDeck } from '../../decks/entities/spell-deck.entity';
import { UserSpell } from './user-spell.entity';

@Entity('spells')
export class Spell extends Card {
  @Column({ nullable: false, type: 'int' })
  effectDuration: number;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  symbol: SpellSymbol;

  @OneToMany(() => UserSpell, (userSpell) => userSpell.spell, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  userSpells: UserSpell[];

  @OneToMany(() => SpellDeck, (spellDeck) => spellDeck.spell, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  spellsDeck: SpellDeck[];
}
