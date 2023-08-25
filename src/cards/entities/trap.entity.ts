import { Column, Entity } from 'typeorm';
import { Card } from './card.entity';
import { TrapSymbol } from '../trap-symbol.enum';

@Entity('traps')
export class Trap extends Card {
  @Column({ nullable: false, type: 'int' })
  effectDuration: number;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  symbol: TrapSymbol;
}
