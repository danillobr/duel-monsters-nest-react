import { Column, Entity, OneToMany } from 'typeorm';
import { Card } from './card.entity';
import { TrapSymbol } from '../enum/trap-symbol.enum';
import { TrapUser } from '../../users/entities/trap-user.entity';
import { TrapDeck } from '../../decks/entities/trap-deck.entity';

@Entity('traps')
export class Trap extends Card {
  @Column({ nullable: false, type: 'int' })
  effectDuration: number;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  symbol: TrapSymbol;

  @OneToMany(() => TrapUser, (trapUser) => trapUser.trap, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  trapsUser: TrapUser[];

  @OneToMany(() => TrapDeck, (trapDeck) => trapDeck.trap, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  trapsDeck: TrapDeck[];
}
