import {
  BaseEntity,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../enum/user-roles.enum';
import { Spell } from '../../cards/entities/spell.entity';
import { Trap } from '../../cards/entities/trap.entity';
import { Monster } from '../../cards/entities/monster.entity';
import { Deck } from '../../decks/entities/deck.entity';

@Entity('users')
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  email: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  @Column({ nullable: false, enum: UserRole })
  role: string;

  @Column({ nullable: false, default: true })
  status: boolean;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  salt: string;

  @Column({ nullable: true, type: 'varchar', length: 64 })
  confirmationToken: string;

  @Column({ nullable: true, type: 'varchar', length: 64 })
  recoverToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Spell)
  @JoinTable()
  spells: Spell[];

  @ManyToMany(() => Trap)
  @JoinTable()
  traps: Trap[];

  @ManyToMany(() => Monster)
  @JoinTable()
  monsters: Monster[];

  @OneToMany(() => Deck, (deck) => deck.user)
  decks: Deck[];

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
