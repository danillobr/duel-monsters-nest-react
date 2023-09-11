import {
  BaseEntity,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Monster } from '../../cards/entities/monster.entity';

@Entity('monsters_users')
export class MonsterUser extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  amount: number;

  @ManyToOne(() => User, (user) => user.monstersUser, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Monster, (monster) => monster.monstersUser, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  monster: Monster;
}
