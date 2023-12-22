import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserRole } from '../enum/user-roles.enum';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CredentialsDto } from '../../auth/dtos/credentials.dto';
import { FindUsersQueryDto } from '../dtos/find-users-query.dto';
import { UserCards } from '../../cards/entities/user-cards.entity';
import { CreateUserWithGoogleDto } from '../dtos/create-user-with-google.dto';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findUsers(
    queryDto: FindUsersQueryDto,
  ): Promise<{ users: User[]; total: number }> {
    queryDto.status = queryDto.status === undefined ? true : queryDto.status;
    queryDto.page = queryDto.page < 1 ? 1 : queryDto.page;
    queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit;

    const { email, name, status, role } = queryDto;
    const query = this.createQueryBuilder('user');
    query.where('user.status = :status', { status });

    if (email) {
      query.andWhere('user.email ILIKE :email', { email: `%${email}%` });
    }

    if (name) {
      query.andWhere('user.name ILIKE :name', { name: `%${name}%` });
    }

    if (role) {
      query.andWhere('user.role = :role', { role });
    }
    query.skip((queryDto.page - 1) * queryDto.limit);
    query.take(+queryDto.limit);
    query.orderBy(queryDto.sort ? JSON.parse(queryDto.sort) : undefined);
    query.select(['user.name', 'user.email', 'user.role', 'user.status']);

    const [users, total] = await query.getManyAndCount();

    return { users, total };
  }

  async createUser(
    createUserDto: CreateUserDto,
    role: UserRole,
  ): Promise<User> {
    const { email, name, password, username } = createUserDto;
    const user = this.create();
    const userCards = new UserCards();
    user.email = email;
    user.username = username;
    user.name = name;
    user.role = role;
    user.status = true;
    user.confirmationToken = crypto.randomBytes(32).toString('hex');
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.cards = userCards;

    try {
      await user.save();
      delete user.password;
      delete user.salt;
      delete user.cards;
      delete user.recoverToken;
      return user;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException(
          'Endereço de email ou username já está em uso',
        );
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o usuário no banco de dados',
        );
      }
    }
  }

  async createUserWithGoogle(
    createUserDto: CreateUserWithGoogleDto,
    role: UserRole,
  ): Promise<User> {
    const { email, name } = createUserDto;
    const user = this.create();
    const userCards = new UserCards();
    user.email = email;
    user.username = await this.generateUniqueUsername(name);
    user.name = name;
    user.role = role;
    user.status = true;
    user.confirmationToken = crypto.randomBytes(32).toString('hex');
    user.cards = userCards;

    try {
      await user.save();
      delete user.cards;
      delete user.recoverToken;
      return user;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException(
          'Endereço de email ou username já está em uso',
        );
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o usuário no banco de dados',
        );
      }
    }
  }

  private async generateUniqueUsername(name: string): Promise<string> {
    const baseUsername = name.toLowerCase().replace(/\s/g, '_');
    let suffix = 0;
    let uniqueUsername = baseUsername;

    while (await this.findOne({ where: { username: uniqueUsername } })) {
      // Gera um inteiro aleatório entre 1 e 1000
      const randomNumber1 = Math.floor(Math.random() * 999) + 1;
      // Gera um inteiro aleatório entre 1 e 5
      const randomNumber2 = Math.floor(Math.random() * 4) + 1;

      suffix += randomNumber1 * randomNumber2;
      uniqueUsername = `${baseUsername}_${suffix}`;
    }

    return uniqueUsername;
  }

  async changePassword(id: string, password: string) {
    const user = await this.findOne({ where: { id } });
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.recoverToken = null;
    await user.save();
  }

  async checkCredentials(credentialsDto: CredentialsDto): Promise<User> {
    const { email, password } = credentialsDto;
    const user = await this.findOne({ where: { email, status: true } });

    if (user && (await user.checkPassword(password))) {
      return user;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}