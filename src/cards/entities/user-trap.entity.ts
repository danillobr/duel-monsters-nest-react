import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Trap } from './trap.entity';
import { UserCards } from './user-cards.entity';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidV4 } from 'uuid';

@Entity('users_traps')
export class UserTrap extends BaseEntity {
  @ApiProperty({ example: uuidV4() })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 3 })
  @Column({ nullable: false, type: 'int' })
  amount: number;

  @ManyToOne(() => UserCards, (userCards) => userCards.userTraps, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  userCards: UserCards;

  @ApiProperty({ type: () => Trap })
  @ManyToOne(() => Trap, (trap) => trap.userTraps, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  trap: Trap;
}
