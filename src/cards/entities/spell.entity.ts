import { Column, Entity } from 'typeorm';
import { Card } from './card.entity';
import { SpellSymbol } from '../spell-symbol.enum';

@Entity('spells')
export class Spell extends Card {
  @Column({ nullable: false, type: 'int' })
  effectDuration: number;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  symbol: SpellSymbol;
}
