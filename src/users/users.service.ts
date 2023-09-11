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
import { Deck } from '../decks/entities/deck.entity';
import { In } from 'typeorm';
import { SpellUser } from './entities/spell-user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private spellsService: SpellsService,
    private trapsService: TrapsService,
    private monstersService: MonstersService,
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

  async findUser(userId: string): Promise<User> {
    return await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.spellsUser', 'spellsUser')
      .leftJoinAndSelect('spellsUser.spell', 'spell')
      .where('user.id = :userId', { userId })
      .getOne();
  }

  async addCardUser(
    addCardUserDto: AddCardUserDto,
    userId: string,
  ): Promise<User> {
    const cardsIds = addCardUserDto.itemsCards.map(
      (itemCard) => itemCard.cardId,
    );

    const user = await this.findUser(userId);
    const spellsUser = user.spellsUser;
    const spells = await this.spellsService.findBy(cardsIds);

    const cardsUser = addCardUserDto.itemsCards.map((itemCard) => {
      const spell = spells.find((card) => card.id === itemCard.cardId);

      const existCardInUser = spellsUser.find(
        (cards) => cards.spell.id === spell.id,
      );

      if (existCardInUser) {
        existCardInUser.amount += itemCard.amount;
        return existCardInUser;
      } else {
        const cardUser = new SpellUser();
        cardUser.spell = spell;
        cardUser.amount = itemCard.amount;
        return cardUser;
      }
    });

    for (const card of spellsUser) {
      const existCard = cardsUser.find(
        (cards) => cards.spell.id === card.spell.id,
      );

      if (!existCard) cardsUser.push(card);
    }

    user.spellsUser = cardsUser;
    // try {
    //   const card = await this.spellsService.findCardById(id);
    //   user.spellsUser.push();
    // } catch (NotFoundException) {
    //   try {
    //     const card = await this.trapsService.findCardById(id);
    //     user.traps.push(card);
    //   } catch (NotFoundException) {
    //     const card = await this.monstersService.findCardById(id);
    //     user.monsters.push(card);
    //   }
    // }

    try {
      user.save();
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar os dados no banco de dados',
      );
    }
  }

  // private findCardById(list: any, type: string, id: String) {
  //   const card = list.find((item) => item.id === id);
  //   return card ? { type, item: card } : null;
  // }

  // async addCardDeckUser(
  //   addCardDeckUserDto: AddCardDeckUserDto,
  //   user: User,
  // ): Promise<Deck> {
  //   const { cardId, nameDeck } = addCardDeckUserDto;
  //   const deck = user.decks.find((item) => item.name === nameDeck);
  //   if (deck === null || deck === undefined)
  //     throw new NotFoundException(`Você não possui o deck ${nameDeck}`);
  //   const card =
  //     this.findCardById(user.spells, 'spell', cardId) ||
  //     this.findCardById(user.traps, 'trap', cardId) ||
  //     this.findCardById(user.monsters, 'monster', cardId);
  //   if (!card) throw new NotFoundException('Você não possui essa carta');
  //   if (card.type === 'spell') deck.spells.push(card.item);
  //   else if (card.type === 'trap') deck.traps.push(card.item);
  //   else deck.monsters.push(card.item);
  //   try {
  //     await deck.save();
  //     return deck;
  //   } catch (error) {
  //     throw new InternalServerErrorException(
  //       'Erro ao salvar os dados no banco de dados',
  //     );
  //   }
  // }
}
