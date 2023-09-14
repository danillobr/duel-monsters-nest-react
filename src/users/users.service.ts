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
import { SpellDeck } from '../decks/entities/spell-deck.entity';
import { MonsterDeck } from '../decks/entities/monster-deck.entity';
import { TrapDeck } from '../decks/entities/trap-deck.entity';
import { InsufficientAmountException } from './errors/Insufficient-amount.exception';
import { RemoveCardDeckUserDto } from './dtos/remove-card-deck-user.dto';

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

  private async addCardInSpellDeck(
    spellsDeck: SpellDeck[],
    cardDeck: SpellDeck,
    cardUser: SpellUser,
    amount: number,
  ): Promise<boolean> {
    if (cardDeck) {
      if (cardDeck.amount + amount <= 3 && cardUser.amount >= amount) {
        cardDeck.amount += amount;
        cardUser.amount -= amount;
      } else {
        return true;
      }
    } else if (cardUser.amount >= amount) {
      const cardDeck = new SpellDeck();
      cardDeck.spell = cardUser.spell;
      cardDeck.amount = amount;
      cardUser.amount -= amount;
      spellsDeck.push(cardDeck);
    }
  }

  private async addCardInTrapDeck(
    trapsDeck: TrapDeck[],
    cardDeck: TrapDeck,
    cardUser: TrapUser,
    amount: number,
  ): Promise<boolean> {
    if (cardDeck) {
      if (cardDeck.amount + amount <= 3 && cardUser.amount >= amount) {
        cardDeck.amount += amount;
        cardUser.amount -= amount;
      } else {
        return true;
      }
    } else if (cardUser.amount >= amount) {
      const cardDeck = new TrapDeck();
      cardDeck.trap = cardUser.trap;
      cardDeck.amount = amount;
      cardUser.amount -= amount;
      trapsDeck.push(cardDeck);
    }
  }

  private async addCardInMonsterDeck(
    monstersDeck: MonsterDeck[],
    cardDeck: MonsterDeck,
    cardUser: MonsterUser,
    amount: number,
  ): Promise<boolean> {
    if (cardDeck) {
      if (cardDeck.amount + amount <= 3 && cardUser.amount >= amount) {
        cardDeck.amount += amount;
        cardUser.amount -= amount;
      } else {
        return true;
      }
    } else if (cardUser.amount >= amount) {
      const cardDeck = new MonsterDeck();
      cardDeck.monster = cardUser.monster;
      cardDeck.amount = amount;
      cardUser.amount -= amount;
      monstersDeck.push(cardDeck);
    }
  }

  async addCardDeckUser(
    addCardDeckUserDto: AddCardDeckUserDto,
    userId: string,
  ): Promise<User> {
    const { cardId, nameDeck, amount } = addCardDeckUserDto;
    const user = await this.findUserWithAllCardsAndDecks(userId);
    const monstersUser = user.monstersUser;
    const trapsUser = user.trapsUser;
    const spellsUser = user.spellsUser;
    const deckUser = user.decks.find((deck) => deck.name === nameDeck);
    const spellsDeck = deckUser.spellsDeck;
    const trapsDeck = deckUser.trapsDeck;
    const monstersDeck = deckUser.monstersDeck;
    let cardUser: SpellUser | MonsterUser | TrapUser;
    let cardDeck: SpellDeck | MonsterDeck | TrapDeck;
    let InsufficientAmount: Boolean;

    cardUser = spellsUser.find((card) => card.spell.id === cardId);
    cardDeck = spellsDeck.find((spells) => spells.spell.id === cardId);

    if (cardUser) {
      InsufficientAmount = await this.addCardInSpellDeck(
        spellsDeck,
        cardDeck,
        cardUser,
        amount,
      );
    } else {
      cardUser = trapsUser.find((card) => card.trap.id === cardId);
      cardDeck = trapsDeck.find((traps) => traps.trap.id === cardId);
      if (cardUser) {
        InsufficientAmount = await this.addCardInTrapDeck(
          trapsDeck,
          cardDeck,
          cardUser,
          amount,
        );
      } else {
        cardUser = monstersUser.find((card) => card.monster.id === cardId);
        cardDeck = monstersDeck.find(
          (monsters) => monsters.monster.id === cardId,
        );
        if (cardUser) {
          InsufficientAmount = await this.addCardInMonsterDeck(
            monstersDeck,
            cardDeck,
            cardUser,
            amount,
          );
        }
      }
    }

    if (InsufficientAmount) throw new InsufficientAmountException();

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

  private async removeCardInSpellDeck(
    spellsDeck: SpellDeck[],
    cardDeck: SpellDeck,
    cardUser: SpellUser,
    amount: number,
  ): Promise<void> {
    if (cardDeck) {
      cardDeck.amount -= amount;
      cardUser.amount += amount;
      if (cardDeck.amount === 0) {
        const index = spellsDeck.findIndex((item) => item.id === cardDeck.id);
        this.decksService.deleteSpellDeck(cardDeck.id);
        spellsDeck.splice(index, 1);
      }
    }
  }

  private async removeCardInTrapDeck(
    trapsDeck: TrapDeck[],
    cardDeck: TrapDeck,
    cardUser: TrapUser,
    amount: number,
  ): Promise<void> {
    if (cardDeck) {
      cardDeck.amount -= amount;
      cardUser.amount += amount;
      if (cardDeck.amount === 0) {
        const index = trapsDeck.findIndex((item) => item.id === cardDeck.id);
        this.decksService.deleteTrapDeck(cardDeck.id);
        trapsDeck.splice(index, 1);
      }
    }
  }

  private async removeCardInMonsterDeck(
    monstersDeck: MonsterDeck[],
    cardDeck: MonsterDeck,
    cardUser: MonsterUser,
    amount: number,
  ): Promise<void> {
    if (cardDeck) {
      cardDeck.amount -= amount;
      cardUser.amount += amount;
      if (cardDeck.amount === 0) {
        const index = monstersDeck.findIndex((item) => item.id === cardDeck.id);
        this.decksService.deleteMonsterDeck(cardDeck.id);
        monstersDeck.splice(index, 1);
      }
    }
  }

  async removeCardDeckUser(
    removeCardDeckUserDto: RemoveCardDeckUserDto,
    userId: string,
  ): Promise<User> {
    const { cardId, nameDeck, amount } = removeCardDeckUserDto;
    const user = await this.findUserWithAllCardsAndDecks(userId);
    const monstersUser = user.monstersUser;
    const trapsUser = user.trapsUser;
    const spellsUser = user.spellsUser;
    const deckUser = user.decks.find((deck) => deck.name === nameDeck);
    const spellsDeck = deckUser.spellsDeck;
    const trapsDeck = deckUser.trapsDeck;
    const monstersDeck = deckUser.monstersDeck;
    let cardUser: SpellUser | MonsterUser | TrapUser;
    let cardDeck: SpellDeck | MonsterDeck | TrapDeck;

    cardUser = spellsUser.find((card) => card.spell.id === cardId);
    cardDeck = spellsDeck.find((spells) => spells.spell.id === cardId);

    if (cardUser) {
      await this.removeCardInSpellDeck(spellsDeck, cardDeck, cardUser, amount);
    } else {
      cardUser = trapsUser.find((card) => card.trap.id === cardId);
      cardDeck = trapsDeck.find((traps) => traps.trap.id === cardId);
      if (cardUser) {
        await this.removeCardInTrapDeck(trapsDeck, cardDeck, cardUser, amount);
      } else {
        cardUser = monstersUser.find((card) => card.monster.id === cardId);
        cardDeck = monstersDeck.find(
          (monsters) => monsters.monster.id === cardId,
        );
        if (cardUser) {
          await this.removeCardInMonsterDeck(
            monstersDeck,
            cardDeck,
            cardUser,
            amount,
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
