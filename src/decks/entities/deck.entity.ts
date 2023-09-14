import { User } from '../../users/entities/user.entity';
import { Monster } from '../../cards/entities/monster.entity';
import { Spell } from '../../cards/entities/spell.entity';
import { Trap } from '../../cards/entities/trap.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Card } from '../../cards/entities/card.entity';
import { SpellDeck } from './spell-deck.entity';
import { TrapDeck } from './trap-deck.entity';
import { MonsterDeck } from './monster-deck.entity';

@Entity('decks')
@Unique(['user', 'name'])
export class Deck extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  // @ManyToMany(() => Spell, {
  //   eager: true,
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  //   cascade: true,
  // })
  // @JoinTable()
  // spells: Spell[];

  // @ManyToMany(() => Trap, {
  //   eager: true,
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  //   cascade: true,
  // })
  // @JoinTable()
  // traps: Trap[];

  // @ManyToMany(() => Monster, {
  //   eager: true,
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  //   cascade: true,
  // })
  // @JoinTable()
  // monsters: Monster[];

  @OneToMany(() => SpellDeck, (spellDeck) => spellDeck.deck, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  spellsDeck: SpellDeck[];

  @OneToMany(() => TrapDeck, (trapDeck) => trapDeck.deck, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  trapsDeck: TrapDeck[];

  @OneToMany(() => MonsterDeck, (monsterDeck) => monsterDeck.deck, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  monstersDeck: MonsterDeck[];

  @ManyToOne(() => User, (user) => user.decks)
  user: User;
}
