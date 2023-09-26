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
import { v4 as uuidV4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

@Entity('monsters_decks')
@Check(`"amount" >= 0 AND "amount" <= 3`)
export class MonsterDeck extends BaseEntity {
  @ApiProperty({ example: uuidV4() })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 3 })
  @Column({ nullable: false, type: 'int' })
  amount: number;

  @ManyToOne(() => Deck, (deck) => deck.monstersDeck, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  deck: Deck;

  @ApiProperty({ type: () => Monster })
  @ManyToOne(() => Monster, (monster) => monster.monstersDeck, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  monster: Monster;
}
