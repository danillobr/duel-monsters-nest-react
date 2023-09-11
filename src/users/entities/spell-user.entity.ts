import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Spell } from '../../cards/entities/spell.entity';

@Entity('spells_users')
export class SpellUser extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'int' })
  amount: number;

  @ManyToOne(() => User, (user) => user.spellsUser, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Spell, (spell) => spell.spellsUser, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  spell: Spell;
}
