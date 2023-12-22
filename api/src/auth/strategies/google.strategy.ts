import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import 'dotenv/config';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { CreateUserWithGoogleDto } from 'src/users/dtos/create-user-with-google.dto';
import { UserRole } from 'src/users/enum/user-roles.enum';
// import * as jwt from 'jsonwebtoken';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly usersRepository: UsersRepository) {
    super({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, emails, photos } = profile;

    const userEmail = emails[0].value;

    const existUser = await this.usersRepository.findOne({
      where: { email: userEmail },
    });

    if (existUser) {
      done(null, existUser);
    } else {
      const fullName =
        name.givenName.toString() + ' ' + name.familyName.toString();
      const newUser = {
        provider: 'google',
        providerId: id,
        email: userEmail,
        name: fullName,
        picture: photos[0].value,
        accessToken,
      };

      const createUserDto: CreateUserWithGoogleDto = {
        name: fullName,
        email: userEmail,
      };

      await this.usersRepository.createUserWithGoogle(
        createUserDto,
        UserRole.USER,
      );

      done(null, newUser);
    }
  }
}
