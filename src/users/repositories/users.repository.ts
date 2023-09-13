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

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
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

  async findUserWithAllCards(userId: string): Promise<User> {
    return await this.createQueryBuilder('user')
      .leftJoinAndSelect('user.spellsUser', 'spellsUser')
      .leftJoinAndSelect('user.monstersUser', 'monstersUser')
      .leftJoinAndSelect('user.trapsUser', 'trapsUser')
      .leftJoinAndSelect('spellsUser.spell', 'spell')
      .leftJoinAndSelect('monstersUser.monster', 'monster')
      .leftJoinAndSelect('trapsUser.trap', 'trap')
      .where('user.id = :userId', { userId })
      // .select(['user.id', 'user.name', 'user.role', 'spellsUser'])
      .getOne();
  }

  async findUserWithAllCardsAndDecks(userId: string): Promise<User> {
    return await this.createQueryBuilder('user')
      .leftJoinAndSelect('user.spellsUser', 'spellsUser')
      .leftJoinAndSelect('spellsUser.spell', 'spellUser')
      .leftJoinAndSelect('user.monstersUser', 'monstersUser')
      .leftJoinAndSelect('monstersUser.monster', 'monster')
      .leftJoinAndSelect('user.trapsUser', 'trapsUser')
      .leftJoinAndSelect('trapsUser.trap', 'trap')
      .leftJoinAndSelect('user.decks', 'decks')
      .leftJoinAndSelect('decks.spellsDeck', 'spellsDeck')
      .leftJoinAndSelect('spellsDeck.spell', 'spellDeck')
      // .leftJoinAndSelect('decks.traps', 'traps')
      // .leftJoinAndSelect('decks.monsters', 'monsters')
      .where('user.id = :userId', { userId })
      .getOne();
  }

  async createUser(
    createUserDto: CreateUserDto,
    role: UserRole,
  ): Promise<User> {
    const { email, name, password } = createUserDto;
    const user = this.create();
    user.email = email;
    user.name = name;
    user.role = role;
    user.status = true;
    user.confirmationToken = crypto.randomBytes(32).toString('hex');
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    try {
      await user.save();
      delete user.password;
      delete user.salt;
      return user;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Endereço de email já está em uso');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o usuário no banco de dados',
        );
      }
    }
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
