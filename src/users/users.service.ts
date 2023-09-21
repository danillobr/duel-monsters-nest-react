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
