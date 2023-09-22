import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { SpellsService } from './spells.service';
import { TrapsService } from './traps.service';
import { MonstersService } from './monsters.service';
import { UsersCardsRepository } from './repositories/users-cards.repository';
import { UserCards } from './entities/user-cards.entity';
import { UserSpell } from './entities/user-spell.entity';
import { UserTrap } from './entities/user-trap.entity';
import { UserMonster } from './entities/user-monster.entity';
import { AddCardInUserDto } from './dto/add-card-user.dto';
import { RemoveCardInUserDto } from './dto/remove-card-user.dto';
import { User } from '../users/entities/user.entity';
import { Deck } from '../decks/entities/deck.entity';
import { CustomError } from '../Errors/custom-errors.error';
import { DecksRepository } from '../decks/repositories/decks.repository';

@Injectable()
export class UsersCardsService {
  constructor(
    private readonly usersCardsRepository: UsersCardsRepository,
    private decksRepository: DecksRepository,
    private spellsService: SpellsService,
    private trapsService: TrapsService,
    private monstersService: MonstersService,
  ) {}

  async findUserCardsByUserCardsId(userCardsId: string): Promise<UserCards> {
    return await this.usersCardsRepository.findUserCardsByUserCardsId(
      userCardsId,
    );
  }

  async addSpellsCardsInUserCards(
    addCardUserDto: AddCardInUserDto,
    userCardsId: string,
  ): Promise<UserCards> {
    const cardsIds = addCardUserDto.itemsCards.map(
      (itemCard) => itemCard.cardId,
    );
    const userCards = await this.findUserCardsByUserCardsId(userCardsId);
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
    addCardUserDto: AddCardInUserDto,
    userCardsId: string,
  ): Promise<UserCards> {
    const cardsIds = addCardUserDto.itemsCards.map(
      (itemCard) => itemCard.cardId,
    );
    const userCards = await this.findUserCardsByUserCardsId(userCardsId);
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
    addCardUserDto: AddCardInUserDto,
    userCardsId: string,
  ): Promise<UserCards> {
    const cardsIds = addCardUserDto.itemsCards.map(
      (itemCard) => itemCard.cardId,
    );
    const userCards = await this.findUserCardsByUserCardsId(userCardsId);
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

  private async removeCardInSpellUser(
    userDeck: Deck,
    userSpells: UserSpell[],
    userCard: UserSpell,
    amount: number,
  ): Promise<void> {
    if (userCard.amount - amount < 0) {
      throw new CustomError('Não é possível remover essa quantidade de cartas');
    } else if (userCard.amount - amount === 0 && !userDeck) {
      const index = userSpells.findIndex((item) => item.id === userCard.id);
      this.usersCardsRepository.deleteUserSpell(userCard.id);
      userSpells.splice(index, 1);
    } else userCard.amount -= amount;
  }

  private async removeCardInTrapUser(
    userDeck: Deck,
    userTraps: UserTrap[],
    userCard: UserTrap,
    amount: number,
  ): Promise<void> {
    if (userCard.amount - amount < 0) {
      throw new CustomError('Não é possível remover essa quantidade de cartas');
    } else if (userCard.amount - amount === 0 && !userDeck) {
      const index = userTraps.findIndex((item) => item.id === userCard.id);
      this.usersCardsRepository.deleteUserTrap(userCard.id);
      userTraps.splice(index, 1);
    } else userCard.amount -= amount;
  }

  private async removeCardInMonsterUser(
    userDeck: Deck,
    userMonsters: UserMonster[],
    userCard: UserMonster,
    amount: number,
  ): Promise<void> {
    if (userCard.amount - amount < 0) {
      throw new CustomError('Não é possível remover essa quantidade de cartas');
    } else if (userCard.amount - amount === 0 && !userDeck) {
      const index = userMonsters.findIndex((item) => item.id === userCard.id);
      this.usersCardsRepository.deleteUserMonster(userCard.id);
      userMonsters.splice(index, 1);
    } else userCard.amount -= amount;
  }

  async removeCardInUserCards(
    removeCardUserDto: RemoveCardInUserDto,
    user: User,
  ): Promise<UserCards> {
    const { cardId, amount } = removeCardUserDto;
    const userCards = await this.findUserCardsByUserCardsId(user.cards.id);
    const userMonsters = userCards.userMonsters;
    const userTraps = userCards.userTraps;
    const userSpells = userCards.userSpells;
    const userDecks = await this.decksRepository.findDecksByUserId(user.id);
    let userCard: UserSpell | UserMonster | UserTrap;
    let userDeck: Deck;

    userCard = userSpells.find((card) => card.spell.id === cardId);
    userDeck = userDecks.find((deck) =>
      deck.spellsDeck.find((spells) => spells.spell.id === cardId),
    );

    if (userCard) {
      await this.removeCardInSpellUser(userDeck, userSpells, userCard, amount);
    } else {
      userCard = userTraps.find((card) => card.trap.id === cardId);
      userDeck = userDecks.find((deck) =>
        deck.trapsDeck.find((spells) => spells.trap.id === cardId),
      );
      if (userCard) {
        await this.removeCardInTrapUser(userDeck, userTraps, userCard, amount);
      } else {
        userCard = userMonsters.find((card) => card.monster.id === cardId);
        userDeck = userDecks.find((deck) =>
          deck.monstersDeck.find((spells) => spells.monster.id === cardId),
        );
        if (userCard) {
          await this.removeCardInMonsterUser(
            userDeck,
            userMonsters,
            userCard,
            amount,
          );
        } else throw new NotFoundException('Carta não encontrada');
      }
    }

    try {
      await userCards.save();
      return userCards;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar os dados no banco de dados',
      );
    }
  }
}
