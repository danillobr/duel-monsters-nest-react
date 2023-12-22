import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Spell } from './spell.entity';
import { UserCards } from './user-cards.entity';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidV4 } from 'uuid';

@Entity('users_spells')
export class UserSpell extends BaseEntity {
  @ApiProperty({ example: uuidV4() })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 3 })
  @Column({ nullable: false, type: 'int' })
  amount: number;

  @ManyToOne(() => UserCards, (userCards) => userCards.userSpells, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  userCards: UserCards;

  @ApiProperty({ type: () => Spell })
  @ManyToOne(() => Spell, (spell) => spell.userSpells, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  spell: Spell;
}
