import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import 'dotenv/config';
import { UsersRepository } from 'src/users/repositories/users.repository';
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
      const newUser = {
        provider: 'google',
        providerId: id,
        email: userEmail,
        name: `${name.givenName} ${name.familyName}`,
        picture: photos[0].value,
        accessToken,
      };

      // const savedUser = await this.usersRepository.save(newUser);

      done(null, newUser);
      // done(null, savedUser);
    }
  }
}
