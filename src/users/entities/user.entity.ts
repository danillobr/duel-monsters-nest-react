import {
  BaseEntity,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  BeforeInsert,
  AfterInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../enum/user-roles.enum';
import { Deck } from '../../decks/entities/deck.entity';
import { UserCards } from '../../cards/entities/user-cards.entity';

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

  // @OneToMany(() => SpellUser, (spellUser) => spellUser.user, {
  //   eager: true,
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  //   cascade: true,
  // })
  // spellsUser: SpellUser[];

  // @OneToMany(() => TrapUser, (trapUser) => trapUser.user, {
  //   eager: true,
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  //   cascade: true,
  // })
  // trapsUser: TrapUser[];

  // @OneToMany(() => MonsterUser, (monsterUser) => monsterUser.user, {
  //   eager: true,
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  //   cascade: true,
  // })
  // monstersUser: MonsterUser[];

  @OneToOne(() => UserCards, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  @JoinColumn()
  cards: UserCards;

  @OneToMany(() => Deck, (deck) => deck.user, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  decks: Deck[];

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
