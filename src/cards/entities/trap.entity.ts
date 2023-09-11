import { ChildEntity, Column, Entity, OneToMany } from 'typeorm';
import { Card } from './card.entity';
import { TrapSymbol } from '../enum/trap-symbol.enum';
import { TrapUser } from '../../users/entities/trap-user.entity';

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
}
