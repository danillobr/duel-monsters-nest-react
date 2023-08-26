import { Column, Entity, ManyToOne } from 'typeorm';
import { Card } from './card.entity';
import { TrapSymbol } from '../enum/trap-symbol.enum';
import { User } from '../../users/entities/user.entity';

@Entity('traps')
export class Trap extends Card {
  @Column({ nullable: false, type: 'int' })
  effectDuration: number;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  symbol: TrapSymbol;
}
