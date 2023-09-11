import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Trap } from '../../cards/entities/trap.entity';

@Entity('traps_users')
export class TrapUser extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'int' })
  amount: number;

  @ManyToOne(() => User, (user) => user.trapsUser, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Trap, (trap) => trap.trapsUser, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  trap: Trap;
}
