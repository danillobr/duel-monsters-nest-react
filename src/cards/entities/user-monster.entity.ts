import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Monster } from './monster.entity';
import { UserCards } from './user-cards.entity';

@Entity('users_monsters')
export class UserMonster extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'int' })
  amount: number;

  @ManyToOne(() => UserCards, (userCards) => userCards.userMonsters, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  userCards: UserCards;

  @ManyToOne(() => Monster, (monster) => monster.userMonsters, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  monster: Monster;
}
