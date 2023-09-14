import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Check,
} from 'typeorm';

import { Deck } from './deck.entity';
import { Monster } from '../../cards/entities/monster.entity';

@Entity('monsters_decks')
@Check(`"amount" >= 0 AND "amount" <= 3`)
export class MonsterDeck extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'int' })
  amount: number;

  @ManyToOne(() => Deck, (deck) => deck.monstersDeck, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  deck: Deck;

  @ManyToOne(() => Monster, (monster) => monster.monstersDeck, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  monster: Monster;
}
