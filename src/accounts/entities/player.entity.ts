import { Column, Entity } from 'typeorm';
import { User } from './user.entity';

@Entity('players')
export class Player extends User {
  @Column()
  deck: string;

  @Column()
  cartas: string;
}
