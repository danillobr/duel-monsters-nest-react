import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
  Param,
  Patch,
  ForbiddenException,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { ReturnUserDto } from './dtos/return-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole } from './enum/user-roles.enum';
import { Role } from '../auth/decorations/role.decorator';
import { GetUser } from '../auth/decorations/get-user.decorator';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';
import { FindUsersQueryDto } from './dtos/find-users-query.dto';
import { AddCardUserDto } from './dtos/add-card-user.dto';
import { AddCardDeckUserDto } from './dtos/add-card-deck-user.dto';
import { idText } from 'typescript';
import { RemoveCardDeckUserDto } from './dtos/remove-card-deck-user.dto';

@Controller('users')
@UseGuards(AuthGuard(), RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @Role(UserRole.ADMIN)
  async createAdminUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.createAdminUser(createUserDto);
    return {
      user,
      message: 'Administrador cadastrado com sucesso',
    };
  }

  @Get(':id')
  @Role(UserRole.ADMIN)
  async findUserById(@Param('id') id): Promise<ReturnUserDto> {
    const user = await this.usersService.findUserById(id);
    return {
      user,
      message: 'Usuário encontrado',
    };
  }

  @Patch('/add-spell-cards')
  async addSpellCard(
    @GetUser() user: User,
    @Body(ValidationPipe) addCardUserDto: AddCardUserDto,
  ) {
    return await this.usersService.addSpellCardsUser(addCardUserDto, user.id);
  }

  @Patch('/add-trap-cards')
  async addTrapCard(
    @GetUser() user: User,
    @Body(ValidationPipe) addCardUserDto: AddCardUserDto,
  ) {
    return await this.usersService.addTrapCardsUser(addCardUserDto, user.id);
  }

  @Patch('/add-monster-cards')
  async addCard(
    @GetUser() user: User,
    @Body(ValidationPipe) addCardUserDto: AddCardUserDto,
  ) {
    return await this.usersService.addMonsterCardsUser(addCardUserDto, user.id);
  }

  @Patch('/add-card-deck')
  async addCardDeck(
    @GetUser() user: User,
    @Body(ValidationPipe) addCardDeckUserDto: AddCardDeckUserDto,
  ) {
    return await this.usersService.addCardDeckUser(addCardDeckUserDto, user.id);
  }

  @Patch('/remove-card-deck')
  async removeCardDeck(
    @GetUser() user: User,
    @Body(ValidationPipe) removeCardDeckUserDto: RemoveCardDeckUserDto,
  ) {
    return await this.usersService.removeCardDeckUser(
      removeCardDeckUserDto,
      user.id,
    );
  }

  @Patch(':id')
  async updateUser(
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @GetUser() user: User,
    @Param('id') id: string,
  ) {
    if (user.role != UserRole.ADMIN && user.id.toString() != id) {
      throw new ForbiddenException(
        'Você não tem autorização para acessar esse recurso',
      );
    } else {
      return this.usersService.updateUser(updateUserDto, id);
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string, @GetUser() user: User) {
    if (user.role != UserRole.ADMIN && user.id.toString() != id) {
      throw new ForbiddenException(
        'Você não tem autorização para acessar esse recurso',
      );
    } else {
      await this.usersService.deleteUser(id);
      return {
        message: 'Usuário removido com sucesso',
      };
    }
  }

  @Get()
  @Role(UserRole.ADMIN)
  async findUsers(@Query() query: FindUsersQueryDto) {
    const found = await this.usersService.findUsers(query);
    return {
      found,
      message: 'Usuários encontrados',
    };
  }
}
