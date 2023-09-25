import { Column, Entity, OneToMany } from 'typeorm';
import { Card } from './card.entity';
import { MonsterDeck } from '../../decks/entities/monster-deck.entity';
import { UserMonster } from './user-monster.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('monsters')
export class Monster extends Card {
  @ApiProperty({ example: 1500 })
  @Column({ nullable: false, type: 'int' })
  atk: number;

  @ApiProperty({ example: 2000 })
  @Column({ nullable: false, type: 'int' })
  def: number;

  @ApiProperty({ example: 5 })
  @Column({ nullable: false, type: 'int' })
  level: number;

  @ApiProperty({ example: true })
  @Column({ nullable: false, default: false })
  specialAbility: boolean;

  @OneToMany(() => UserMonster, (userMonster) => userMonster.monster, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  userMonsters: UserMonster[];

  @OneToMany(() => MonsterDeck, (monsterDeck) => monsterDeck.monster, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  monstersDeck: MonsterDeck[];
}
