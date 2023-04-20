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
import { IsUniqueEmail } from '../is-unique-email.validator';

export class CreateUserDto {
  @IsUniqueEmail({ message: 'email must be unique' })
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
