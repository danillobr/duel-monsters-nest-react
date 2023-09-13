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
import { SpellUser } from './entities/spell-user.entity';
import { TrapUser } from './entities/trap-user.entity';
import { MonsterUser } from './entities/monster-user.entity';
import { AddCardDeckUserDto } from './dtos/add-card-deck-user.dto';
import { DecksService } from '../decks/decks.service';
import { Monster } from '../cards/entities/monster.entity';
import { Spell } from '../cards/entities/spell.entity';
import { Trap } from '../cards/entities/trap.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private spellsService: SpellsService,
    private trapsService: TrapsService,
    private monstersService: MonstersService,
    private decksService: DecksService,
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

  async findUserWithAllCards(userId: string): Promise<User> {
    return await this.usersRepository.findUserWithAllCards(userId);
  }

  async findUserWithAllCardsAndDecks(userId: string): Promise<User> {
    return await this.usersRepository.findUserWithAllCardsAndDecks(userId);
  }

  async addSpellCardsUser(
    addCardUserDto: AddCardUserDto,
    userId: string,
  ): Promise<User> {
    const cardsIds = addCardUserDto.itemsCards.map(
      (itemCard) => itemCard.cardId,
    );
    const user = await this.findUserWithAllCards(userId);
    const spellsUser = user.spellsUser;
    const spells = await this.spellsService.findBy(cardsIds);

    addCardUserDto.itemsCards.map((itemCard) => {
      const spell = spells.find((card) => card.id === itemCard.cardId);
      const existCardInUser = spellsUser.find(
        (cards) => cards.spell.id === spell.id,
      );

      if (existCardInUser) {
        existCardInUser.amount += itemCard.amount;
      } else {
        const cardUser = new SpellUser();
        cardUser.spell = spell;
        cardUser.amount = itemCard.amount;
        spellsUser.push(cardUser);
      }
    });

    try {
      await user.save();
      delete user.password;
      delete user.salt;
      delete user.status;
      delete user.confirmationToken;
      delete user.recoverToken;
      delete user.createdAt;
      delete user.updatedAt;
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar os dados no banco de dados',
      );
    }
  }

  async addTrapCardsUser(
    addCardUserDto: AddCardUserDto,
    userId: string,
  ): Promise<User> {
    const cardsIds = addCardUserDto.itemsCards.map(
      (itemCard) => itemCard.cardId,
    );
    const user = await this.findUserWithAllCards(userId);
    const trapsUser = user.trapsUser;
    const traps = await this.trapsService.findBy(cardsIds);

    addCardUserDto.itemsCards.map((itemCard) => {
      const trap = traps.find((card) => card.id === itemCard.cardId);
      const existCardInUser = trapsUser.find(
        (cards) => cards.trap.id === trap.id,
      );

      if (existCardInUser) {
        existCardInUser.amount += itemCard.amount;
      } else {
        const cardUser = new TrapUser();
        cardUser.trap = trap;
        cardUser.amount = itemCard.amount;
        trapsUser.push(cardUser);
      }
    });

    try {
      await user.save();
      delete user.password;
      delete user.salt;
      delete user.status;
      delete user.confirmationToken;
      delete user.recoverToken;
      delete user.createdAt;
      delete user.updatedAt;
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar os dados no banco de dados',
      );
    }
  }

  async addMonsterCardsUser(
    addCardUserDto: AddCardUserDto,
    userId: string,
  ): Promise<User> {
    const cardsIds = addCardUserDto.itemsCards.map(
      (itemCard) => itemCard.cardId,
    );
    const user = await this.findUserWithAllCards(userId);
    const monstersUser = user.monstersUser;
    const monsters = await this.monstersService.findBy(cardsIds);

    addCardUserDto.itemsCards.map((itemCard) => {
      const monster = monsters.find((card) => card.id === itemCard.cardId);
      const existCardInUser = monstersUser.find(
        (cards) => cards.monster.id === monster.id,
      );

      if (existCardInUser) {
        existCardInUser.amount += itemCard.amount;
      } else {
        const cardUser = new MonsterUser();
        cardUser.monster = monster;
        cardUser.amount = itemCard.amount;
        monstersUser.push(cardUser);
      }
    });

    try {
      await user.save();
      delete user.password;
      delete user.salt;
      delete user.status;
      delete user.confirmationToken;
      delete user.recoverToken;
      delete user.createdAt;
      delete user.updatedAt;
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar os dados no banco de dados',
      );
    }
  }

  async addCardDeckUser(
    addCardDeckUserDto: AddCardDeckUserDto,
    userId: string,
  ): Promise<User> {
    const { cardId, nameDeck } = addCardDeckUserDto;
    const user = await this.findUserWithAllCardsAndDecks(userId);
    const monstersUser = user.monstersUser;
    const trapsUser = user.trapsUser;
    const spellsUser = user.spellsUser;
    const deckUser = user.decks.find((deck) => deck.name === nameDeck);
    let cardUser: Spell | Monster | Trap;

    cardUser = monstersUser.find((card) => card.monster.id === cardId)?.monster;

    if (cardUser) {
      deckUser.monsters.push(cardUser);
    } else {
      cardUser = trapsUser.find((card) => card.trap.id === cardId)?.trap;
      if (cardUser) {
        deckUser.traps.push(cardUser);
      } else {
        cardUser = spellsUser.find((card) => card.spell.id === cardId)?.spell;
        if (cardUser) {
          deckUser.spells.push(cardUser);
        } else {
          throw new NotFoundException(
            'Você não possui essa carta ou o ID está incorreto',
          );
        }
      }
    }

    try {
      await user.save();
      delete user.password;
      delete user.salt;
      delete user.status;
      delete user.confirmationToken;
      delete user.recoverToken;
      delete user.createdAt;
      delete user.updatedAt;
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar os dados no banco de dados',
      );
    }
  }
}
