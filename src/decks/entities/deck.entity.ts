import { User } from '../../users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
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
