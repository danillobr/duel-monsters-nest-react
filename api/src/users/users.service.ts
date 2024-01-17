import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserRole } from './enum/user-roles.enum';
import { User } from './entities/user.entity';
import { createUser } from './dtos/create-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { UpdateUserDto } from './dtos/update-user.dto';
import { FindUsersQueryDto } from './dtos/find-users-query.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createAdminUser(createUser: createUser): Promise<User> {
    if (createUser.password != createUser.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      return await this.usersRepository.createUser(createUser, UserRole.ADMIN);
    }
  }

  async findUserById(userId: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      select: [
        'email',
        'name',
        'role',
        'id',
        'status',
        'createdAt',
        'updatedAt',
      ],
    });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    delete user.cards;
    delete user.decks;
    return user;
  }

  async updateUser(
    updateUserDto: UpdateUserDto,
    user: User,
    id: string,
  ): Promise<User> {
    const { name, email, role, status } = updateUserDto;

    if (
      (user.role != UserRole.ADMIN && user.id.toString() != id) ||
      (user.role === UserRole.USER && updateUserDto.role === UserRole.ADMIN)
    ) {
      throw new ForbiddenException(
        'Você não tem autorização para acessar esse recurso',
      );
    }

    const existUser = await this.findUserById(id);

    existUser.name = name ? name : existUser.name;
    existUser.email = email ? email : existUser.email;
    existUser.role = role ? role : existUser.role;
    existUser.status = status === undefined ? existUser.status : status;
    try {
      await existUser.save();
      return existUser;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar os dados no banco de dados',
      );
    }
  }

  async deleteUser(user: User, userId: string): Promise<{ message: string }> {
    if (user.role != UserRole.ADMIN && user.id.toString() != userId) {
      throw new ForbiddenException(
        'Você não tem autorização para acessar esse recurso!',
      );
    }

    const result = await this.usersRepository.delete({ id: userId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado um usuário com o ID informado!1',
      );
    }

    return { message: 'Usuário removido com sucesso!' };
  }

  async findUsers(
    queryDto: FindUsersQueryDto,
  ): Promise<{ users: User[]; total: number }> {
    const users = await this.usersRepository.findUsers(queryDto);
    return users;
  }
}
