import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserCards } from '../entities/user-cards.entity';

@Injectable()
export class UsersCardsRepository extends Repository<UserCards> {
  constructor(private readonly dataSource: DataSource) {
    super(UserCards, dataSource.createEntityManager());
  }

  async findUserCardsByUserCardsId(userCardsId: string): Promise<UserCards> {
    return await this.createQueryBuilder('userCards')
      .leftJoinAndSelect('userCards.userSpells', 'userSpells')
      .leftJoinAndSelect('userCards.userMonsters', 'userMonsters')
      .leftJoinAndSelect('userCards.userTraps', 'userTraps')
      .leftJoinAndSelect('userSpells.spell', 'spell')
      .leftJoinAndSelect('userMonsters.monster', 'monster')
      .leftJoinAndSelect('userTraps.trap', 'trap')
      .where('userCards.id = :userCardsId', { userCardsId })
      .getOne();
  }

  async deleteUserSpell(userSpellId: string) {
    await this.createQueryBuilder()
      .delete()
      .from('users_spells')
      .where('id = :userSpellId', { userSpellId })
      .execute();
  }

  async deleteUserTrap(userTrapId: string) {
    await this.createQueryBuilder()
      .delete()
      .from('users_traps')
      .where('id = :userTrapId', { userTrapId })
      .execute();
  }

  async deleteUserMonster(userMonsterId: string) {
    await this.createQueryBuilder()
      .delete()
      .from('users_monsters')
      .where('id = :userMonsterId', { userMonsterId })
      .execute();
  }
}
