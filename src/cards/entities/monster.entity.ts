import { Column, Entity, OneToMany } from 'typeorm';
import { Card } from './card.entity';
import { MonsterUser } from '../../users/entities/monster-user.entity';
import { MonsterDeck } from '../../decks/entities/monster-deck.entity';

@Entity('monsters')
export class Monster extends Card {
  @Column({ nullable: false, type: 'int' })
  atk: number;

  @Column({ nullable: false, type: 'int' })
  def: number;

  @Column({ nullable: false, type: 'int' })
  level: number;

  @Column({ nullable: false, default: false })
  specialAbility: boolean;

  @OneToMany(() => MonsterUser, (monsterUser) => monsterUser.monster, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  monstersUser: MonsterUser[];

  @OneToMany(() => MonsterDeck, (monsterDeck) => monsterDeck.monster, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  monstersDeck: MonsterDeck[];
}
