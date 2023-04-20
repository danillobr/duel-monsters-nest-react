import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
@ValidatorConstraint()
export class IsUniqueEmailConstraint implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  validate(
    email: string,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    return !!!this.userService.findByEmail(email);
  }
}

export function IsUniqueEmail(validationOptions?: ValidationOptions) {
  return function (object: CreateUserDto, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniqueEmailConstraint,
    });
  };
}
