import { Column, Entity, ManyToOne } from 'typeorm';
import { Card } from './card.entity';
import { User } from '../../users/entities/user.entity';

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
}
