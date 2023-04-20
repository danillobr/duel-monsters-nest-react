import { Column, Entity } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('players')
export class Player extends User {
  @Column()
  deck: string;

  @Column()
  cards: string;
}
