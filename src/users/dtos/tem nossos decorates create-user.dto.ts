// import {
//   IsEmail,
//   IsNotEmpty,
//   IsString,
//   Matches,
//   MaxLength,
//   MinLength,
// } from 'class-validator';
// import { IsUniqueEmail } from '../is-unique-email.validator';

// export class CreateUserDto {
//   @IsUniqueEmail({ message: 'email must be unique' })
//   @IsEmail()
//   @IsNotEmpty()
//   email: string;

//   @IsString()
//   @IsNotEmpty()
//   @MinLength(4)
//   @MaxLength(20)
//   @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
//     message: 'password too weak',
//   })
//   password: string;

//   @IsString()
//   @IsNotEmpty()
//   name: string;
// }
