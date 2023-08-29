import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserRole } from './enum/user-roles.enum';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRepository } from './repositories/users.repository';
import { UpdateUserDto } from './dtos/update-user.dto';
import { FindUsersQueryDto } from './dtos/find-users-query.dto';
import { SpellsService } from '../cards/spells.service';
import { AddCardUserDto } from './dtos/add-card-user.dto';
import { Card } from '../cards/entities/card.entity';
import { CreateSpellDto } from '../cards/dto/create-spell.dto';
import { Spell } from '../cards/entities/spell.entity';
import { SpellSymbol } from '../cards/enum/spell-symbol.enum';
import { TrapsService } from '../cards/traps.service';
import { MonstersService } from '../cards/monsters.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private spellsService: SpellsService,
    private trapsService: TrapsService,
    private monstersService: MonstersService, // private jwtService: JwtService,
  ) {}

  async createAdminUser(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      return await this.userRepository.createUser(
        createUserDto,
        UserRole.ADMIN,
      );
    }
  }

  async findUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['email', 'name', 'role', 'id', 'spells'],
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
    const result = await this.userRepository.delete({ id: userId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado um usuário com o ID informado',
      );
    }
  }

  async findUsers(
    queryDto: FindUsersQueryDto,
  ): Promise<{ users: User[]; total: number }> {
    const users = await this.userRepository.findUsers(queryDto);
    return users;
  }

  async addCardUser(
    addCardUserDto: AddCardUserDto,
    userId: string,
  ): Promise<User> {
    const { id } = addCardUserDto;
    const user = await this.findUserById(userId);

    try {
      const card = await this.spellsService.findCardById(id);
      user.spells.push(card);
    } catch (error) {
      try {
        const card = await this.trapsService.findCardById(id);
        user.traps.push(card);
      } catch (error) {
        try {
          const card = await this.monstersService.findCardById(id);
          user.monsters.push(card);
        } catch (error) {
          throw new NotFoundException('Essa carta não existe');
        }
      }
    }

    try {
      await user.save();
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar os dados no banco de dados',
      );
    }
  }

  async createSpellCard(createSpellCardDto: CreateSpellDto): Promise<Card> {
    return await this.spellsService.create(createSpellCardDto);
  }
}
