import { Column, Entity, OneToMany } from 'typeorm';
import { Card } from './card.entity';
import { TrapSymbol } from '../enum/trap-symbol.enum';
import { TrapDeck } from '../../decks/entities/trap-deck.entity';
import { UserTrap } from './user-trap.entity';

@Entity('traps')
export class Trap extends Card {
  @Column({ nullable: false, type: 'int' })
  effectDuration: number;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  symbol: TrapSymbol;

  @OneToMany(() => UserTrap, (userTrap) => userTrap.trap, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  userTraps: UserTrap[];

  @OneToMany(() => TrapDeck, (trapDeck) => trapDeck.trap, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  trapsDeck: TrapDeck[];
}
