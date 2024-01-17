import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { createUser } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { ReturnUserDto } from './dtos/return-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from './enum/user-roles.enum';
import { Role } from '../auth/decorations/role.decorator';
import { GetUser } from '../auth/decorations/get-user.decorator';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';
import { FindUsersQueryDto } from './dtos/find-users-query.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { UnauthorizedResponseDto } from '../auth/dtos/unauthorized-response.dto';
import { ReturnGetUserDto } from './dtos/return-get-user.dto';

@Controller('users')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  type: UnauthorizedResponseDto,
  description: 'Não autorizado',
})
@ApiTags('users')
@UseGuards(AuthGuard(), RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'O cadastro foi realizado com sucesso.',
    type: ReturnUserDto,
  })
  @ApiConflictResponse({
    description:
      'O endereço de email é único, não podendo ter dois ou mais usuários com o mesmo email.',
  })
  @ApiForbiddenResponse({
    description: 'Usuário não altorizado a acessar essa funcionalidade',
  })
  @ApiBadRequestResponse({
    description:
      'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número ou um símbulo',
  })
  @ApiUnprocessableEntityResponse({ description: 'As senhas não conferem' })
  @ApiInternalServerErrorResponse({
    description: 'Erro ao salvar o usuário no banco de dados.',
  })
  @Role(UserRole.ADMIN)
  async createAdminUser(
    @Body(ValidationPipe) createUser: createUser,
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.createAdminUser(createUser);
    return {
      user,
      message: 'Administrador cadastrado com sucesso',
    };
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Usuário encontrado!',
    type: ReturnGetUserDto,
  })
  @ApiForbiddenResponse({
    description: 'Usuário não altorizado a acessar essa funcionalidade',
  })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado!' })
  @Role(UserRole.ADMIN)
  async findUserById(@Param('id') id: string): Promise<ReturnUserDto> {
    const user = await this.usersService.findUserById(id);
    return {
      user,
      message: 'Usuário encontrado',
    };
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Usuário encontrado!',
    type: UpdateUserDto,
  })
  @ApiForbiddenResponse({
    description: 'Usuário não altorizado a acessar essa funcionalidade',
  })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado!' })
  async updateUser(
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @GetUser() user: User,
    @Param('id') id: string,
  ) {
    return this.usersService.updateUser(updateUserDto, user, id);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Usuário removido com sucesso!',
  })
  @ApiForbiddenResponse({
    description: 'Você não tem autorização para acessar esse recurso!',
  })
  @ApiNotFoundResponse({
    description: 'Não foi encontrado um usuário com o ID informado!',
  })
  async deleteUser(@Param('id') id: string, @GetUser() user: User) {
    return await this.usersService.deleteUser(user, id);
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
