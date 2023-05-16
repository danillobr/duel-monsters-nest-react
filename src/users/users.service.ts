import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserRole } from './user-roles.enum';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository, // private jwtService: JwtService,
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
}
