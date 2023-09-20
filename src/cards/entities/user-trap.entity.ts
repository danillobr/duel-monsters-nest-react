import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Trap } from './trap.entity';
import { UserCards } from './user-cards.entity';

@Entity('users_traps')
export class UserTrap extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'int' })
  amount: number;

  @ManyToOne(() => UserCards, (userCards) => userCards.userTraps, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  userCards: UserCards;

  @ManyToOne(() => Trap, (trap) => trap.userTraps, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  trap: Trap;
}
