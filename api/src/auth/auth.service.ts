import {
  Injectable,
  UnprocessableEntityException,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UsersRepository } from '../users/repositories/users.repository';
import { createUser } from '../users/dtos/create-user.dto';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../users/enum/user-roles.enum';
import { CredentialsDto } from './dtos/credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { EmailOptions, MailingService } from 'src/mailing/mailing.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly mailingService: MailingService,
  ) {}

  async signUp(createUser: createUser): Promise<User> {
    if (createUser.password != createUser.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      const user = await this.usersRepository.createUser(
        createUser,
        UserRole.USER,
      );
      const mail: EmailOptions = {
        to: user.email,
        from: 'noreply@application.com',
        subject: 'Email de confirmação',
        template: 'email-confirmation',
        context: {
          token: user.confirmationToken,
        },
      };
      await this.mailingService.sendMail(mail);
      return user;
    }
  }

  async signIn(credentialsDto: CredentialsDto) {
    const user = await this.usersRepository.checkCredentials(credentialsDto);

    if (user === null) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const jwtPayload = {
      id: user.id,
    };
    const token = await this.jwtService.sign(jwtPayload);

    return { token };
  }

  async googleLogin(req) {
    const { user } = req;
    if (!user) {
      throw new BadRequestException('Nenhum usuário do Google');
    }

    const jwtPayload = {
      sub: user.id,
      email: user.email,
    };
    const token = await this.jwtService.sign(jwtPayload);

    return { token };
  }

  async confirmEmail(confirmationToken: string): Promise<void> {
    const result = await this.usersRepository.update(
      { confirmationToken },
      { confirmationToken: null },
    );
    if (result.affected === 0) throw new NotFoundException('Token inválido');
  }

  async sendRecoverPasswordEmail(email: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user)
      throw new NotFoundException('Não há usuário cadastrado com esse email.');

    user.recoverToken = randomBytes(32).toString('hex');
    await user.save();

    const mail: EmailOptions = {
      to: user.email,
      from: 'noreply@application.com',
      subject: 'Recuperação de senha',
      template: 'recover-password',
      context: {
        token: user.recoverToken,
      },
    };
    await this.mailingService.sendMail(mail);
  }

  async changePassword(
    id: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const { password, passwordConfirmation } = changePasswordDto;

    if (password != passwordConfirmation)
      throw new UnprocessableEntityException('As senhas não conferem');

    await this.usersRepository.changePassword(id, password);
  }

  async resetPassword(
    recoverToken: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: { recoverToken },
      select: ['id'],
    });
    if (!user) throw new NotFoundException('Token inválido.');

    try {
      await this.changePassword(user.id.toString(), changePasswordDto);
    } catch (error) {
      throw error;
    }
  }
}
