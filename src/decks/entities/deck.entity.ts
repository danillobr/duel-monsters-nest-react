import { User } from '../../users/entities/user.entity';
import { Monster } from '../../cards/entities/monster.entity';
import { Spell } from '../../cards/entities/spell.entity';
import { Trap } from '../../cards/entities/trap.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('decks')
@Unique(['name'])
export class Deck extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  @ManyToMany(() => Spell)
  @JoinTable()
  spells: Spell[];

  @ManyToMany(() => Trap)
  @JoinTable()
  traps: Trap[];

  @ManyToMany(() => Monster)
  @JoinTable()
  monsters: Monster[];

  @ManyToOne(() => User, (user) => user.decks)
  user: User;
}
