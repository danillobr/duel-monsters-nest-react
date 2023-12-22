import { createParamDecorator } from '@nestjs/common';
import { User } from '../../users/entities/user.entity';

export const GetUser = createParamDecorator((data, req): User => {
  const user = req.args[0].user;
  delete user.cards;
  delete user.decks;
  return user;
});
