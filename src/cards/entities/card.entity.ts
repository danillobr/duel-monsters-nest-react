import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Unique(['name'])
export abstract class Card extends BaseEntity {
  @ApiProperty({ example: uuidV4() })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Espada do Dragão' })
  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  @ApiProperty({ example: 'Essa carta faz tal coisa' })
  @Column({ nullable: false, type: 'varchar', length: 500 })
  description: string;

  @ApiProperty({ example: 'Img da carta, essa parte ainda não está pronta' })
  @Column({ nullable: false, type: 'varchar', length: 500 })
  img: string;

  @ApiProperty({ example: new Date().toISOString() })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: new Date().toISOString() })
  @UpdateDateColumn()
  updatedAt: Date;
}
