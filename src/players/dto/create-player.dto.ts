import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Unique } from 'typeorm';
import { Player } from '../entities/player.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreatePlayerDto extends CreateUserDto {}
