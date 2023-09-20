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

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

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

  // async findUserWithAllCardsAndDecks(userId: string): Promise<User> {
  //   return await this.usersRepository.findUserWithAllCardsAndDecks(userId);
  // }

  // private async addCardInSpellDeck(
  //   spellsDeck: SpellDeck[],
  //   cardDeck: SpellDeck,
  //   cardUser: SpellUser,
  //   amount: number,
  // ): Promise<void> {
  //   if (cardDeck) {
  //     if (cardDeck.amount + amount <= 3 && cardUser.amount >= amount) {
  //       cardDeck.amount += amount;
  //       cardUser.amount -= amount;
  //     } else {
  //       throw new CustomError(
  //         'Limite máximo de 3 cartas por deck atingido,' +
  //           ' ou não tem cartas suficientes na sua lista de cartas',
  //       );
  //     }
  //   } else if (cardUser.amount >= amount) {
  //     const cardDeck = new SpellDeck();
  //     cardDeck.spell = cardUser.spell;
  //     cardDeck.amount = amount;
  //     cardUser.amount -= amount;
  //     spellsDeck.push(cardDeck);
  //   }
  // }

  // private async addCardInTrapDeck(
  //   trapsDeck: TrapDeck[],
  //   cardDeck: TrapDeck,
  //   cardUser: TrapUser,
  //   amount: number,
  // ): Promise<void> {
  //   if (cardDeck) {
  //     if (cardDeck.amount + amount <= 3 && cardUser.amount >= amount) {
  //       cardDeck.amount += amount;
  //       cardUser.amount -= amount;
  //     } else {
  //       throw new CustomError(
  //         'Limite máximo de 3 cartas por deck atingido,' +
  //           ' ou não tem cartas suficientes na sua lista de cartas',
  //       );
  //     }
  //   } else if (cardUser.amount >= amount) {
  //     const cardDeck = new TrapDeck();
  //     cardDeck.trap = cardUser.trap;
  //     cardDeck.amount = amount;
  //     cardUser.amount -= amount;
  //     trapsDeck.push(cardDeck);
  //   }
  // }

  // private async addCardInMonsterDeck(
  //   monstersDeck: MonsterDeck[],
  //   cardDeck: MonsterDeck,
  //   cardUser: MonsterUser,
  //   amount: number,
  // ): Promise<void> {
  //   if (cardDeck) {
  //     if (cardDeck.amount + amount <= 3 && cardUser.amount >= amount) {
  //       cardDeck.amount += amount;
  //       cardUser.amount -= amount;
  //     } else {
  //       throw new CustomError(
  //         'Limite máximo de 3 cartas por deck atingido,' +
  //           ' ou não tem cartas suficiente na sua lista de cartas',
  //       );
  //     }
  //   } else if (cardUser.amount >= amount) {
  //     const cardDeck = new MonsterDeck();
  //     cardDeck.monster = cardUser.monster;
  //     cardDeck.amount = amount;
  //     cardUser.amount -= amount;
  //     monstersDeck.push(cardDeck);
  //   }
  // }

  // async addCardDeckUser(
  //   addCardDeckUserDto: AddCardDeckUserDto,
  //   userId: string,
  // ): Promise<User> {
  //   const { cardId, nameDeck, amount } = addCardDeckUserDto;
  //   const user = await this.findUserWithAllCardsAndDecks(userId);
  //   const monstersUser = user.monstersUser;
  //   const trapsUser = user.trapsUser;
  //   const spellsUser = user.spellsUser;
  //   const deckUser = user.decks.find((deck) => deck.name === nameDeck);
  //   const spellsDeck = deckUser.spellsDeck;
  //   const trapsDeck = deckUser.trapsDeck;
  //   const monstersDeck = deckUser.monstersDeck;
  //   let cardUser: SpellUser | MonsterUser | TrapUser;
  //   let cardDeck: SpellDeck | MonsterDeck | TrapDeck;

  //   cardUser = spellsUser.find((card) => card.spell.id === cardId);
  //   cardDeck = spellsDeck.find((spells) => spells.spell.id === cardId);

  //   if (cardUser) {
  //     await this.addCardInSpellDeck(spellsDeck, cardDeck, cardUser, amount);
  //   } else {
  //     cardUser = trapsUser.find((card) => card.trap.id === cardId);
  //     cardDeck = trapsDeck.find((traps) => traps.trap.id === cardId);
  //     if (cardUser) {
  //       await this.addCardInTrapDeck(trapsDeck, cardDeck, cardUser, amount);
  //     } else {
  //       cardUser = monstersUser.find((card) => card.monster.id === cardId);
  //       cardDeck = monstersDeck.find(
  //         (monsters) => monsters.monster.id === cardId,
  //       );
  //       if (cardUser) {
  //         await this.addCardInMonsterDeck(
  //           monstersDeck,
  //           cardDeck,
  //           cardUser,
  //           amount,
  //         );
  //       } else {
  //         throw new NotFoundException(
  //           'Você não possui essa carta na sua lista de cartas',
  //         );
  //       }
  //     }
  //   }

  //   try {
  //     await user.save();
  //     delete user.password;
  //     delete user.salt;
  //     delete user.status;
  //     delete user.confirmationToken;
  //     delete user.recoverToken;
  //     delete user.createdAt;
  //     delete user.updatedAt;
  //     return user;
  //   } catch (error) {
  //     throw new InternalServerErrorException(
  //       'Erro ao salvar os dados no banco de dados',
  //     );
  //   }
  // }

  // private async removeCardInSpellDeck(
  //   spellsDeck: SpellDeck[],
  //   cardDeck: SpellDeck,
  //   cardUser: SpellUser,
  //   amount: number,
  // ): Promise<void> {
  //   if (cardDeck.amount - amount < 0) {
  //     throw new CustomError(
  //       `Não é possível remover ${amount} cartas,` +
  //         ` pois só existem ${cardDeck.amount} cartas ${cardDeck.spell.name}` +
  //         ` no deck`,
  //     );
  //   }
  //   cardDeck.amount -= amount;
  //   cardUser.amount += amount;
  //   if (cardDeck.amount === 0) {
  //     const index = spellsDeck.findIndex((item) => item.id === cardDeck.id);
  //     this.decksService.deleteSpellDeck(cardDeck.id);
  //     spellsDeck.splice(index, 1);
  //   }
  // }

  // private async removeCardInTrapDeck(
  //   trapsDeck: TrapDeck[],
  //   cardDeck: TrapDeck,
  //   cardUser: TrapUser,
  //   amount: number,
  // ): Promise<void> {
  //   if (cardDeck.amount - amount < 0) {
  //     throw new CustomError(
  //       `Não é possível remover ${amount} cartas,` +
  //         ` pois só existem ${cardDeck.amount} cartas ${cardDeck.trap.name}` +
  //         ` no deck`,
  //     );
  //   }
  //   cardDeck.amount -= amount;
  //   cardUser.amount += amount;
  //   if (cardDeck.amount === 0) {
  //     const index = trapsDeck.findIndex((item) => item.id === cardDeck.id);
  //     this.decksService.deleteTrapDeck(cardDeck.id);
  //     trapsDeck.splice(index, 1);
  //   }
  // }

  // private async removeCardInMonsterDeck(
  //   monstersDeck: MonsterDeck[],
  //   cardDeck: MonsterDeck,
  //   cardUser: MonsterUser,
  //   amount: number,
  // ): Promise<void> {
  //   if (cardDeck.amount - amount < 0) {
  //     throw new CustomError(
  //       `Não é possível remover ${amount} cartas,` +
  //         ` pois só existem ${cardDeck.amount} cartas ${cardDeck.monster.name}` +
  //         ` no deck`,
  //     );
  //   }
  //   cardDeck.amount -= amount;
  //   cardUser.amount += amount;
  //   if (cardDeck.amount === 0) {
  //     const index = monstersDeck.findIndex((item) => item.id === cardDeck.id);
  //     this.decksService.deleteMonsterDeck(cardDeck.id);
  //     monstersDeck.splice(index, 1);
  //   }
  // }

  // async removeCardDeckUser(
  //   removeCardDeckUserDto: RemoveCardDeckUserDto,
  //   userId: string,
  // ): Promise<User> {
  //   const { cardId, nameDeck, amount } = removeCardDeckUserDto;
  //   const user = await this.findUserWithAllCardsAndDecks(userId);
  //   const monstersUser = user.monstersUser;
  //   const trapsUser = user.trapsUser;
  //   const spellsUser = user.spellsUser;
  //   const deckUser = user.decks.find((deck) => deck.name === nameDeck);
  //   const spellsDeck = deckUser.spellsDeck;
  //   const trapsDeck = deckUser.trapsDeck;
  //   const monstersDeck = deckUser.monstersDeck;
  //   let cardUser: SpellUser | MonsterUser | TrapUser;
  //   let cardDeck: SpellDeck | MonsterDeck | TrapDeck;

  //   cardUser = spellsUser.find((card) => card.spell.id === cardId);
  //   cardDeck = spellsDeck.find((spells) => spells.spell.id === cardId);

  //   if (cardUser) {
  //     await this.removeCardInSpellDeck(spellsDeck, cardDeck, cardUser, amount);
  //   } else {
  //     cardUser = trapsUser.find((card) => card.trap.id === cardId);
  //     cardDeck = trapsDeck.find((traps) => traps.trap.id === cardId);
  //     if (cardUser) {
  //       await this.removeCardInTrapDeck(trapsDeck, cardDeck, cardUser, amount);
  //     } else {
  //       cardUser = monstersUser.find((card) => card.monster.id === cardId);
  //       cardDeck = monstersDeck.find(
  //         (monsters) => monsters.monster.id === cardId,
  //       );
  //       if (cardUser) {
  //         await this.removeCardInMonsterDeck(
  //           monstersDeck,
  //           cardDeck,
  //           cardUser,
  //           amount,
  //         );
  //       } else
  //         throw new NotFoundException(
  //           `Carta não encontrada no deck ${nameDeck}`,
  //         );
  //     }
  //   }

  //   try {
  //     await user.save();
  //     delete user.password;
  //     delete user.salt;
  //     delete user.status;
  //     delete user.confirmationToken;
  //     delete user.recoverToken;
  //     delete user.createdAt;
  //     delete user.updatedAt;
  //     return user;
  //   } catch (error) {
  //     throw new InternalServerErrorException(
  //       'Erro ao salvar os dados no banco de dados',
  //     );
  //   }
  // }

  // private async removeCardInSpellUser(
  //   deckUser: Deck,
  //   spellsUser: SpellUser[],
  //   cardUser: SpellUser,
  //   amount: number,
  // ): Promise<void> {
  //   if (cardUser.amount - amount < 0) {
  //     throw new CustomError('Não é possível remover essa quantidade de cartas');
  //   } else if (cardUser.amount - amount === 0 && !deckUser) {
  //     const index = spellsUser.findIndex((item) => item.id === cardUser.id);
  //     this.spellsService.deleteSpellUser(cardUser.id);
  //     spellsUser.splice(index, 1);
  //   } else cardUser.amount -= amount;
  // }

  // private async removeCardInTrapUser(
  //   deckUser: Deck,
  //   trapsUser: TrapUser[],
  //   cardUser: TrapUser,
  //   amount: number,
  // ): Promise<void> {
  //   if (cardUser.amount - amount < 0) {
  //     throw new CustomError('Não é possível remover essa quantidade de cartas');
  //   } else if (cardUser.amount - amount === 0 && !deckUser) {
  //     const index = trapsUser.findIndex((item) => item.id === cardUser.id);
  //     this.trapsService.deleteTrapUser(cardUser.id);
  //     trapsUser.splice(index, 1);
  //   } else cardUser.amount -= amount;
  // }

  // private async removeCardInMonsterUser(
  //   deckUser: Deck,
  //   monstersUser: MonsterUser[],
  //   cardUser: MonsterUser,
  //   amount: number,
  // ): Promise<void> {
  //   if (cardUser.amount - amount < 0) {
  //     throw new CustomError('Não é possível remover essa quantidade de cartas');
  //   } else if (cardUser.amount - amount === 0 && !deckUser) {
  //     const index = monstersUser.findIndex((item) => item.id === cardUser.id);
  //     this.trapsService.deleteTrapUser(cardUser.id);
  //     monstersUser.splice(index, 1);
  //   } else cardUser.amount -= amount;
  // }

  // async removeCardUser(
  //   removeCardUserDto: RemoveCardUserDto,
  //   userId: string,
  // ): Promise<User> {
  //   const { cardId, amount } = removeCardUserDto;
  //   const user = await this.findUserWithAllCardsAndDecks(userId);
  //   const monstersUser = user.monstersUser;
  //   const trapsUser = user.trapsUser;
  //   const spellsUser = user.spellsUser;
  //   let cardUser: SpellUser | MonsterUser | TrapUser;
  //   let deckUser: Deck;

  //   cardUser = spellsUser.find((card) => card.spell.id === cardId);
  //   deckUser = user.decks.find((deck) =>
  //     deck.spellsDeck.find((spells) => spells.spell.id === cardId),
  //   );

  //   if (cardUser) {
  //     await this.removeCardInSpellUser(deckUser, spellsUser, cardUser, amount);
  //   } else {
  //     cardUser = trapsUser.find((card) => card.trap.id === cardId);
  //     deckUser = user.decks.find((deck) =>
  //       deck.trapsDeck.find((traps) => traps.trap.id === cardId),
  //     );
  //     if (cardUser) {
  //       await this.removeCardInTrapUser(deckUser, trapsUser, cardUser, amount);
  //     } else {
  //       cardUser = monstersUser.find((card) => card.monster.id === cardId);
  //       deckUser = user.decks.find((deck) =>
  //         deck.monstersDeck.find((traps) => traps.monster.id === cardId),
  //       );
  //       if (cardUser) {
  //         await this.removeCardInMonsterUser(
  //           deckUser,
  //           monstersUser,
  //           cardUser,
  //           amount,
  //         );
  //       } else throw new NotFoundException('Carta não encontrada');
  //     }
  //   }

  //   try {
  //     await user.save();
  //     delete user.password;
  //     delete user.salt;
  //     delete user.status;
  //     delete user.confirmationToken;
  //     delete user.recoverToken;
  //     delete user.createdAt;
  //     delete user.updatedAt;
  //     return user;
  //   } catch (error) {
  //     throw new InternalServerErrorException(
  //       'Erro ao salvar os dados no banco de dados',
  //     );
  //   }
  // }
}
