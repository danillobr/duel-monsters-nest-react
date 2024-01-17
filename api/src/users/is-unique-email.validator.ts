// import { Injectable } from '@nestjs/common';
// import {
//   registerDecorator,
//   ValidationArguments,
//   ValidationOptions,
//   ValidatorConstraint,
//   ValidatorConstraintInterface,
// } from 'class-validator';

// import { createUser } from './dtos/tem nossos decorates create-user.dto';
// import { UsersService } from './user.service';
// import { PlayerService } from 'src/players/player.service';

// @Injectable()
// @ValidatorConstraint()
// export class IsUniqueEmailConstraint implements ValidatorConstraintInterface {
//   constructor(private userService: PlayerService) {}

//   validate(
//     email: string,
//     validationArguments?: ValidationArguments,
//   ): boolean | Promise<boolean> {
//     return !!!this.userService.findByEmail(email);
//   }
// }

// export function IsUniqueEmail(validationOptions?: ValidationOptions) {
//   return function (object: createUser, propertyName: string) {
//     registerDecorator({
//       target: object.constructor,
//       propertyName: propertyName,
//       options: validationOptions,
//       constraints: [],
//       validator: IsUniqueEmailConstraint,
//     });
//   };
// }
