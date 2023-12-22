import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateDeckDto } from './dtos/create-deck.dto';
import { DecksRepository } from './repositories/decks.repository';
import { Deck } from './entities/deck.entity';
import { User } from '../users/entities/user.entity';
import { SpellDeck } from './entities/spell-deck.entity';
import { UserSpell } from '../cards/entities/user-spell.entity';
import { CustomError } from '../Errors/custom-errors.error';
import { TrapDeck } from './entities/trap-deck.entity';
import { MonsterDeck } from './entities/monster-deck.entity';
import { UserMonster } from '../cards/entities/user-monster.entity';
import { UserTrap } from '../cards/entities/user-trap.entity';
import { AddCardInDeckDto } from './dtos/add-card-deck.dto';
import { UsersCardsRepository } from '../cards/repositories/users-cards.repository';
import { RemoveCardInDeckDto } from './dtos/remove-card-deck-user.dto';

@Injectable()
export class DecksService {
  constructor(
    private readonly decksRepository: DecksRepository,
    private readonly usersCardsRepository: UsersCardsRepository,
  ) {}

  async create(createDeckDto: CreateDeckDto, user: User): Promise<Deck> {
    const { name } = createDeckDto;
    return await this.decksRepository.createDeck(name, user);
  }

  async remove(deckId: string) {
    const deck = await this.decksRepository.findById(deckId);
    if (!deck) throw new NotFoundException('Deck não encontrado');
    const result = await this.decksRepository.delete(deckId);
    if (result.affected === 0) {
      throw new NotFoundException('Não foi possível delete o deck');
    }
  }

  private async deleteSpellDeck(spellDeckId: string) {
    this.decksRepository.deleteSpellDeck(spellDeckId);
  }

  private async deleteTrapDeck(trapDeckId: string) {
    this.decksRepository.deleteTrapDeck(trapDeckId);
  }

  private async deleteMonsterDeck(monsterDeckId: string) {
    this.decksRepository.deleteMonsterDeck(monsterDeckId);
  }

  private async findDecksByUserId(userId: string): Promise<Deck[]> {
    return await this.decksRepository.findDecksByUserId(userId);
  }

  private async addCardInSpellDeck(
    spellsDeck: SpellDeck[],
    deckCard: SpellDeck,
    userCard: UserSpell,
    amount: number,
  ): Promise<void> {
    if (deckCard) {
      if (deckCard.amount + amount <= 3 && userCard.amount >= amount) {
        deckCard.amount += amount;
        userCard.amount -= amount;
      } else {
        throw new CustomError(
          'Limite máximo de 3 cartas por deck atingido,' +
            ' ou não tem cartas suficientes na sua lista de cartas',
        );
      }
    } else if (userCard.amount >= amount) {
      const cardDeck = new SpellDeck();
      cardDeck.spell = userCard.spell;
      cardDeck.amount = amount;
      userCard.amount -= amount;
      spellsDeck.push(cardDeck);
    }
  }

  private async addCardInTrapDeck(
    trapsDeck: TrapDeck[],
    deckCard: TrapDeck,
    userCard: UserTrap,
    amount: number,
  ): Promise<void> {
    if (deckCard) {
      if (deckCard.amount + amount <= 3 && userCard.amount >= amount) {
        deckCard.amount += amount;
        userCard.amount -= amount;
      } else {
        throw new CustomError(
          'Limite máximo de 3 cartas por deck atingido,' +
            ' ou não tem cartas suficientes na sua lista de cartas',
        );
      }
    } else if (userCard.amount >= amount) {
      const cardDeck = new TrapDeck();
      cardDeck.trap = userCard.trap;
      cardDeck.amount = amount;
      userCard.amount -= amount;
      trapsDeck.push(cardDeck);
    }
  }

  private async addCardInMonsterDeck(
    monstersDeck: MonsterDeck[],
    deckCard: MonsterDeck,
    userCard: UserMonster,
    amount: number,
  ): Promise<void> {
    if (deckCard) {
      if (deckCard.amount + amount <= 3 && userCard.amount >= amount) {
        deckCard.amount += amount;
        userCard.amount -= amount;
      } else {
        throw new CustomError(
          'Limite máximo de 3 cartas por deck atingido,' +
            ' ou não tem cartas suficiente na sua lista de cartas',
        );
      }
    } else if (userCard.amount >= amount) {
      const cardDeck = new MonsterDeck();
      cardDeck.monster = userCard.monster;
      cardDeck.amount = amount;
      userCard.amount -= amount;
      monstersDeck.push(cardDeck);
    }
  }

  async addCardInDeck(
    addCardDeckUserDto: AddCardInDeckDto,
    user: User,
  ): Promise<Deck> {
    const { cardId, nameDeck, amount } = addCardDeckUserDto;
    const userCards =
      await this.usersCardsRepository.findUserCardsByUserCardsId(user.cards.id);
    const userDecks = await this.findDecksByUserId(user.id);
    const userDeck = userDecks.find((deck) => deck.name === nameDeck);

    if (!userDeck) {
      throw new NotFoundException(
        `Você não possui um deck chamado ${nameDeck} `,
      );
    }

    const monstersUser = userCards.userMonsters;
    const trapsUser = userCards.userTraps;
    const spellsUser = userCards.userSpells;
    const spellsDeck = userDeck.spellsDeck;
    const trapsDeck = userDeck.trapsDeck;
    const monstersDeck = userDeck.monstersDeck;
    let userCard: UserSpell | UserMonster | UserTrap;
    let deckCard: SpellDeck | MonsterDeck | TrapDeck;

    userCard = spellsUser.find((card) => card.spell.id === cardId);
    deckCard = spellsDeck.find((spells) => spells.spell.id === cardId);

    if (userCard) {
      await this.addCardInSpellDeck(spellsDeck, deckCard, userCard, amount);
    } else {
      userCard = trapsUser.find((card) => card.trap.id === cardId);
      deckCard = trapsDeck.find((traps) => traps.trap.id === cardId);
      if (userCard) {
        await this.addCardInTrapDeck(trapsDeck, deckCard, userCard, amount);
      } else {
        userCard = monstersUser.find((card) => card.monster.id === cardId);
        deckCard = monstersDeck.find(
          (monsters) => monsters.monster.id === cardId,
        );
        if (userCard) {
          await this.addCardInMonsterDeck(
            monstersDeck,
            deckCard,
            userCard,
            amount,
          );
        } else {
          throw new NotFoundException(
            'Você não possui essa carta na sua lista de cartas.',
          );
        }
      }
    }

    try {
      await userDeck.save();
      await userCards.save();
      return userDeck;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao adicionar a carta ao deck.',
      );
    }
  }

  private async removeCardInSpellDeck(
    spellsDeck: SpellDeck[],
    deckCard: SpellDeck,
    userCard: UserSpell,
    amount: number,
  ): Promise<void> {
    if (deckCard.amount - amount < 0) {
      throw new CustomError(
        `Não é possível remover ${amount} cartas,` +
          ` pois só existem ${userCard.amount} cartas ${userCard.spell.name}` +
          ` no deck`,
      );
    }
    deckCard.amount -= amount;
    userCard.amount += amount;
    if (deckCard.amount === 0) {
      const index = spellsDeck.findIndex((item) => item.id === deckCard.id);
      this.deleteSpellDeck(deckCard.id);
      spellsDeck.splice(index, 1);
    }
  }

  private async removeCardInTrapDeck(
    trapsDeck: TrapDeck[],
    deckCard: TrapDeck,
    userCard: UserTrap,
    amount: number,
  ): Promise<void> {
    if (deckCard.amount - amount < 0) {
      throw new CustomError(
        `Não é possível remover ${amount} cartas,` +
          ` pois só existem ${deckCard.amount} cartas ${deckCard.trap.name}` +
          ` no deck`,
      );
    }
    deckCard.amount -= amount;
    userCard.amount += amount;
    if (deckCard.amount === 0) {
      const index = trapsDeck.findIndex((item) => item.id === deckCard.id);
      this.deleteTrapDeck(deckCard.id);
      trapsDeck.splice(index, 1);
    }
  }

  private async removeCardInMonsterDeck(
    monstersDeck: MonsterDeck[],
    deckCard: MonsterDeck,
    userCard: UserMonster,
    amount: number,
  ): Promise<void> {
    if (deckCard.amount - amount < 0) {
      throw new CustomError(
        `Não é possível remover ${amount} cartas,` +
          ` pois só existem ${deckCard.amount} cartas ${deckCard.monster.name}` +
          ` no deck`,
      );
    }
    deckCard.amount -= amount;
    userCard.amount += amount;
    if (deckCard.amount === 0) {
      const index = monstersDeck.findIndex((item) => item.id === deckCard.id);
      this.deleteMonsterDeck(deckCard.id);
      monstersDeck.splice(index, 1);
    }
  }

  async removeCardInDeck(
    removeCardDeckUserDto: RemoveCardInDeckDto,
    user: User,
  ): Promise<Deck> {
    const { cardId, nameDeck, amount } = removeCardDeckUserDto;
    const userCards =
      await this.usersCardsRepository.findUserCardsByUserCardsId(user.cards.id);
    const monstersUser = userCards.userMonsters;
    const trapsUser = userCards.userTraps;
    const spellsUser = userCards.userSpells;
    const userDecks = await this.findDecksByUserId(user.id);
    const userDeck = userDecks.find((deck) => deck.name === nameDeck);

    if (!userDeck) {
      throw new NotFoundException(
        `Você não possui um deck chamado ${nameDeck} `,
      );
    }

    const spellsDeck = userDeck.spellsDeck;
    const trapsDeck = userDeck.trapsDeck;
    const monstersDeck = userDeck.monstersDeck;
    let userCard: UserSpell | UserMonster | UserTrap;
    let deckCard: SpellDeck | MonsterDeck | TrapDeck;

    userCard = spellsUser.find((card) => card.spell.id === cardId);
    deckCard = spellsDeck.find((spells) => spells.spell.id === cardId);

    if (deckCard) {
      await this.removeCardInSpellDeck(spellsDeck, deckCard, userCard, amount);
    } else {
      userCard = trapsUser.find((card) => card.trap.id === cardId);
      deckCard = trapsDeck.find((traps) => traps.trap.id === cardId);
      if (deckCard) {
        await this.removeCardInTrapDeck(trapsDeck, deckCard, userCard, amount);
      } else {
        userCard = monstersUser.find((card) => card.monster.id === cardId);
        deckCard = monstersDeck.find(
          (monsters) => monsters.monster.id === cardId,
        );
        if (deckCard) {
          await this.removeCardInMonsterDeck(
            monstersDeck,
            deckCard,
            userCard,
            amount,
          );
        } else
          throw new NotFoundException(
            `Carta não encontrada no deck ${nameDeck}`,
          );
      }
    }

    try {
      await userDeck.save();
      await userCards.save();
      return userDeck;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar os dados no banco de dados',
      );
    }
  }
}
