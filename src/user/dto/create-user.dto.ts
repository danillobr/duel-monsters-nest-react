import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Unique } from 'typeorm';
import { User } from '../entities/user.entity';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  // @Unique()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
