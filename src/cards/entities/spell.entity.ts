import { Column, Entity, ManyToOne } from 'typeorm';
import { Card } from './card.entity';
import { SpellSymbol } from '../enum/spell-symbol.enum';
import { User } from '../../users/entities/user.entity';

@Entity('spells')
export class Spell extends Card {
  @Column({ nullable: false, type: 'int' })
  effectDuration: number;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  symbol: SpellSymbol;
}