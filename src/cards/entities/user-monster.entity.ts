import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Monster } from './monster.entity';
import { UserCards } from './user-cards.entity';
import { v4 as uuidV4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users_monsters')
export class UserMonster extends BaseEntity {
  @ApiProperty({ example: uuidV4() })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 3 })
  @Column({ nullable: false, type: 'int' })
  amount: number;

  @ManyToOne(() => UserCards, (userCards) => userCards.userMonsters, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  userCards: UserCards;

  @ApiProperty({ type: () => Monster })
  @ManyToOne(() => Monster, (monster) => monster.userMonsters, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  monster: Monster;
}
