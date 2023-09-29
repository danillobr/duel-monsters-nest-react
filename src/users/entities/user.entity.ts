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
import { v4 as uuidV4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';
import * as crypto from 'crypto';

@Entity('users')
@Unique(['email'])
export class User extends BaseEntity {
  @ApiProperty({ example: uuidV4() })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'joao@gmail.com' })
  @Column({ nullable: false, type: 'varchar', length: 200 })
  email: string;

  @ApiProperty({ example: 'João Vitor da Silva' })
  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  @ApiProperty({
    example: 'USER',
    enum: UserRole,
  })
  @Column({ nullable: false, enum: UserRole })
  role: UserRole;

  @ApiProperty({ example: true })
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

  @ApiProperty({ example: new Date().toISOString() })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: new Date().toISOString() })
  @UpdateDateColumn()
  updatedAt: Date;

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
