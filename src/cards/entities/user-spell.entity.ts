import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Spell } from './spell.entity';
import { UserCards } from './user-cards.entity';

@Entity('users_spells')
export class UserSpell extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'int' })
  amount: number;

  @ManyToOne(() => UserCards, (userCards) => userCards.userSpells, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  userCards: UserCards;

  @ManyToOne(() => Spell, (spell) => spell.userSpells, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  spell: Spell;
}
