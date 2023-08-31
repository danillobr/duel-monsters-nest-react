import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserRole } from './enum/user-roles.enum';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { UpdateUserDto } from './dtos/update-user.dto';
import { FindUsersQueryDto } from './dtos/find-users-query.dto';
import { SpellsService } from '../cards/spells.service';
import { TrapsService } from '../cards/traps.service';
import { MonstersService } from '../cards/monsters.service';
import { AddCardUserDto } from './dtos/add-card-user.dto';
import { AddCardDeckUserDto } from './dtos/add-card-deck-user.dto';
import { DecksService } from '../decks/decks.service';
import { Deck } from 'src/decks/entities/deck.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private spellsService: SpellsService,
    private trapsService: TrapsService,
    private monstersService: MonstersService,
    private decksService: DecksService, // private jwtService: JwtService,
  ) {}

  async createAdminUser(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      return await this.usersRepository.createUser(
        createUserDto,
        UserRole.ADMIN,
      );
    }
  }

  async findUserById(userId: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      select: ['email', 'name', 'role', 'id'],
    });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    return user;
  }

  async updateUser(updateUserDto: UpdateUserDto, id: string): Promise<User> {
    const user = await this.findUserById(id);
    const { name, email, role, status } = updateUserDto;
    user.name = name ? name : user.name;
    user.email = email ? email : user.email;
    user.role = role ? role : user.role;
    user.status = status === undefined ? user.status : status;
    try {
      await user.save();
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar os dados no banco de dados',
      );
    }
  }

  async deleteUser(userId: string) {
    const result = await this.usersRepository.delete({ id: userId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado um usuário com o ID informado',
      );
    }
  }

  async findUsers(
    queryDto: FindUsersQueryDto,
  ): Promise<{ users: User[]; total: number }> {
    const users = await this.usersRepository.findUsers(queryDto);
    return users;
  }

  async addCardUser(addCardUserDto: AddCardUserDto, user: User): Promise<User> {
    const { id } = addCardUserDto;
    try {
      const card = await this.spellsService.findCardById(id);
      user.spells.push(card);
    } catch (NotFoundException) {
      try {
        const card = await this.trapsService.findCardById(id);
        user.traps.push(card);
      } catch (NotFoundException) {
        const card = await this.monstersService.findCardById(id);
        user.monsters.push(card);
      }
    }
    try {
      await user.save();
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar os dados no banco de dados',
      );
    }
  }

  findCardById(list: any, type: string, id: String) {
    const card = list.find((item) => item.id === id);
    return card ? { type, item: card } : null;
  }

  async addCardDeckUser(
    addCardDeckUserDto: AddCardDeckUserDto,
    user: User,
  ): Promise<Deck> {
    const { cardId, nameDeck } = addCardDeckUserDto;
    const deck = user.decks.find((item) => item.name === nameDeck);
    if (deck === null || deck === undefined)
      throw new NotFoundException(`Você não possui o deck ${nameDeck}`);
    const card =
      this.findCardById(user.spells, 'spell', cardId) ||
      this.findCardById(user.traps, 'trap', cardId) ||
      this.findCardById(user.monsters, 'monster', cardId);
    if (!card) throw new NotFoundException('Você não possui essa carta');
    if (card.type === 'spell') deck.spells.push(card.item);
    else if (card.type === 'trap') deck.traps.push(card.item);
    else deck.monsters.push(card.item);

    // try {
    //   const card = await this.spellsService.findCardByIdAndUserId(
    //     cardId,
    //     user.id,
    //   );
    //   deck.spells.push(card);
    // } catch (NotFoundException) {
    //   try {
    //     const card = await this.trapsService.findCardByIdAndUserId(
    //       cardId,
    //       user.id,
    //     );
    //     deck.traps.push(card);
    //   } catch (NotFoundException) {
    //     const card = await this.monstersService.findCardByIdAndUserId(
    //       cardId,
    //       user.id,
    //     );
    //     deck.monsters.push(card);
    //   }
    // }

    try {
      await deck.save();
      return deck;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar os dados no banco de dados',
      );
    }
  }
}
