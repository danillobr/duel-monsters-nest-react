import { DataSource, Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Deck } from '../entities/deck.entity';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class DecksRepository extends Repository<Deck> {
  constructor(private dataSource: DataSource) {
    super(Deck, dataSource.createEntityManager());
  }

  async createDeck(name: string, user: User): Promise<Deck> {
    const deck = this.create();
    deck.name = name;
    deck.user = user;
    try {
      await deck.save();
      delete deck.user;
      deck.spellsDeck = [];
      deck.trapsDeck = [];
      deck.monstersDeck = [];
      return deck;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Já existe um deck com esse nome.');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o deck no banco de dados.',
        );
      }
    }
  }

  async findById(deckId: string): Promise<Deck> {
    return await this.findOne({ where: { id: deckId } });
  }

  async findDecksByUserId(userId: string): Promise<Deck[]> {
    return await this.find({
      where: { user: { id: userId } },
      relations: [
        'spellsDeck',
        'trapsDeck',
        'monstersDeck',
        'spellsDeck.spell',
        'trapsDeck.trap',
        'monstersDeck.monster',
      ],
    });
  }

  async deleteSpellDeck(spellDeckId: string) {
    await this.createQueryBuilder()
      .delete()
      .from('spells_decks')
      .where('id = :spellDeckId', { spellDeckId })
      .execute();
  }

  async deleteTrapDeck(trapDeckId: string) {
    await this.createQueryBuilder()
      .delete()
      .from('traps_decks')
      .where('id = :trapDeckId', { trapDeckId })
      .execute();
  }

  async deleteMonsterDeck(monsterDeckId: string) {
    await this.createQueryBuilder()
      .delete()
      .from('monsters_decks')
      .where('id = :monsterDeckId', { monsterDeckId })
      .execute();
  }
}
