import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeckDto } from './dto/create-deck.dto';
import { DecksRepository } from './repositories/decks.repository';
import { Deck } from './entities/deck.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class DecksService {
  constructor(private readonly decksRepository: DecksRepository) {}

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

  async deleteSpellDeck(spellDeckId: string) {
    this.decksRepository.deleteSpellDeck(spellDeckId);
  }

  async deleteTrapDeck(trapDeckId: string) {
    this.decksRepository.deleteTrapDeck(trapDeckId);
  }

  async deleteMonsterDeck(monsterDeckId: string) {
    this.decksRepository.deleteMonsterDeck(monsterDeckId);
  }
}
