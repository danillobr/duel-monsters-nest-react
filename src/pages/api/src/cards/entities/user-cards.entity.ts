import { BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserMonster } from './user-monster.entity';
import { UserTrap } from './user-trap.entity';
import { UserSpell } from './user-spell.entity';

@Entity('users_cards')
export class UserCards extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => UserSpell, (userSpell) => userSpell.userCards, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  userSpells: UserSpell[];

  @OneToMany(() => UserTrap, (userTrap) => userTrap.userCards, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  userTraps: UserTrap[];

  @OneToMany(() => UserMonster, (userMonster) => userMonster.userCards, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  userMonsters: UserMonster[];
}
