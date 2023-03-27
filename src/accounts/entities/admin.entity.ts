import { Entity } from 'typeorm';
import { User } from './user.entity';

@Entity('admins')
export class Admin extends User {}
