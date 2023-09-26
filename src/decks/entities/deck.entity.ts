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
import { v4 as uuidV4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

@Entity('decks')
@Unique(['user', 'name'])
export class Deck extends BaseEntity {
  @ApiProperty({ example: uuidV4() })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Metalfoes deck' })
  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  @ApiProperty({ type: () => [SpellDeck] })
  @OneToMany(() => SpellDeck, (spellDeck) => spellDeck.deck, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  spellsDeck: SpellDeck[];

  @ApiProperty({ type: () => [TrapDeck] })
  @OneToMany(() => TrapDeck, (trapDeck) => trapDeck.deck, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  trapsDeck: TrapDeck[];

  @ApiProperty({ type: () => [MonsterDeck] })
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
