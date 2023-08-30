import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Deck } from '../entities/deck.entity';
import { CreateDeckDto } from '../dto/create-deck.dto';

@Injectable()
export class DecksRepository extends Repository<Deck> {
  constructor(private dataSource: DataSource) {
    super(Deck, dataSource.createEntityManager());
  }

  // async createDeck(createDeckDto: CreateDeckDto): Promise<User> {
  //   const { name } = createDeckDto;
  //   const user = this.create();
  //   user.email = email;
  //   user.name = name;
  //   user.role = role;
  //   user.status = true;
  //   user.confirmationToken = crypto.randomBytes(32).toString('hex');
  //   user.salt = await bcrypt.genSalt();
  //   user.password = await this.hashPassword(password, user.salt);
  //   try {
  //     await user.save();
  //     delete user.password;
  //     delete user.salt;
  //     return user;
  //   } catch (error) {
  //     if (error.code.toString() === '23505') {
  //       throw new ConflictException('Endereço de email já está em uso');
  //     } else {
  //       throw new InternalServerErrorException(
  //         'Erro ao salvar o usuário no banco de dados',
  //       );
  //     }
  //   }
  // }

  // async changePassword(id: string, password: string) {
  //   const user = await this.findOne({ where: { id } });
  //   user.salt = await bcrypt.genSalt();
  //   user.password = await this.hashPassword(password, user.salt);
  //   user.recoverToken = null;
  //   await user.save();
  // }

  // async checkCredentials(credentialsDto: CredentialsDto): Promise<User> {
  //   const { email, password } = credentialsDto;
  //   const user = await this.findOne({ where: { email, status: true } });

  //   if (user && (await user.checkPassword(password))) {
  //     return user;
  //   } else {
  //     return null;
  //   }
  // }

  // private async hashPassword(password: string, salt: string): Promise<string> {
  //   return bcrypt.hash(password, salt);
  // }
}
