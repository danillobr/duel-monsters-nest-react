import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { SpellsService } from './spells.service';
import { TrapsService } from './traps.service';
import { MonstersService } from './monsters.service';

import { DecksService } from '../decks/decks.service';
import { SpellDeck } from '../decks/entities/spell-deck.entity';
import { MonsterDeck } from '../decks/entities/monster-deck.entity';
import { TrapDeck } from '../decks/entities/trap-deck.entity';

import { Deck } from '../decks/entities/deck.entity';
import { CustomError } from '../Errors/custom-errors.error';
import { UsersCardsRepository } from './repositories/users-cards.repository';
import { UserCards } from './entities/user-cards.entity';
import { AddCardUserDto } from '../users/dtos/add-card-user.dto';
import { UserSpell } from './entities/user-spell.entity';
import { UserTrap } from './entities/user-trap.entity';
import { UserMonster } from './entities/user-monster.entity';

@Injectable()
export class UsersCardsService {
  constructor(
    private readonly usersCardsRepository: UsersCardsRepository,
    private spellsService: SpellsService,
    private trapsService: TrapsService,
    private monstersService: MonstersService,
  ) {}

  async findUserCards(userCardsId: string): Promise<UserCards> {
    return await this.usersCardsRepository.findUserCards(userCardsId);
  }

  // async findUserWithAllCardsAndDecks(userId: string): Promise<User> {
  //   return await this.usersRepository.findUserWithAllCardsAndDecks(userId);
  // }

  async addSpellsCardsInUserCards(
    addCardUserDto: AddCardUserDto,
    userCardsId: string,
  ): Promise<UserCards> {
    const cardsIds = addCardUserDto.itemsCards.map(
      (itemCard) => itemCard.cardId,
    );
    const userCards = await this.findUserCards(userCardsId);
    console.log('aqui: ', userCards);
    const userSpells = userCards.userSpells;
    const spells = await this.spellsService.findBy(cardsIds);

    addCardUserDto.itemsCards.map((itemCard) => {
      const spell = spells.find((card) => card.id === itemCard.cardId);
      const existCardInUser = userSpells.find(
        (cards) => cards.spell.id === spell.id,
      );

      if (existCardInUser) {
        existCardInUser.amount += itemCard.amount;
      } else {
        const userSpell = new UserSpell();
        userSpell.spell = spell;
        userSpell.amount = itemCard.amount;
        userSpells.push(userSpell);
      }
    });

    try {
      await userCards.save();
      return userCards;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar os dados no banco de dados',
      );
    }
  }

  async addTrapsCardsInUserCards(
    addCardUserDto: AddCardUserDto,
    userCardsId: string,
  ): Promise<UserCards> {
    const cardsIds = addCardUserDto.itemsCards.map(
      (itemCard) => itemCard.cardId,
    );
    const userCards = await this.findUserCards(userCardsId);
    const userTraps = userCards.userTraps;
    const traps = await this.trapsService.findBy(cardsIds);

    addCardUserDto.itemsCards.map((itemCard) => {
      const trap = traps.find((card) => card.id === itemCard.cardId);
      const existCardInUser = userTraps.find(
        (cards) => cards.trap.id === trap.id,
      );

      if (existCardInUser) {
        existCardInUser.amount += itemCard.amount;
      } else {
        const userTrap = new UserTrap();
        userTrap.trap = trap;
        userTrap.amount = itemCard.amount;
        userTraps.push(userTrap);
      }
    });

    try {
      await userCards.save();
      return userCards;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar os dados no banco de dados',
      );
    }
  }

  async addMonstersCardsInUserCards(
    addCardUserDto: AddCardUserDto,
    userCardsId: string,
  ): Promise<UserCards> {
    const cardsIds = addCardUserDto.itemsCards.map(
      (itemCard) => itemCard.cardId,
    );
    const userCards = await this.findUserCards(userCardsId);
    const userMonsters = userCards.userMonsters;
    const monsters = await this.monstersService.findBy(cardsIds);

    addCardUserDto.itemsCards.map((itemCard) => {
      const monster = monsters.find((card) => card.id === itemCard.cardId);
      const existCardInUser = userMonsters.find(
        (cards) => cards.monster.id === monster.id,
      );

      if (existCardInUser) {
        existCardInUser.amount += itemCard.amount;
      } else {
        const userMonster = new UserMonster();
        userMonster.monster = monster;
        userMonster.amount = itemCard.amount;
        userMonsters.push(userMonster);
      }
    });

    try {
      await userCards.save();
      return userCards;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar os dados no banco de dados',
      );
    }
  }

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

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

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
}
