import { Entity } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('admins')
export class Admin extends User {}
