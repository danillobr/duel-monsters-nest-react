import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { MonstersService } from './monsters.service';
import { CreateMonsterDto } from './dtos/create-monster.dto';
import { ReturnCardDto } from './dtos/return-card.dto';
import { CreateTrapDto } from './dtos/create-trap.dto';
import { TrapsService } from './traps.service';
import { SpellsService } from './spells.service';
import { CreateSpellDto } from './dtos/create-spell.dto';
import { Role } from '../auth/decorations/role.decorator';
import { UserRole } from '../users/enum/user-roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { GetUser } from '../auth/decorations/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { UsersCardsService } from './users-cards.service';
import { AddCardInUserDto } from './dtos/add-card-user.dto';
import { RemoveCardInUserDto } from './dtos/remove-card-user.dto';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserSpell } from './entities/user-spell.entity';
import { UserTrap } from './entities/user-trap.entity';
import { UserMonster } from './entities/user-monster.entity';
import { RemoveCardInUserResponse } from './dtos/return-remove-card-user.dto';
import { UnauthorizedResponseDto } from '../auth/dtos/unauthorized-response.dto';

@Controller('cards')
@ApiBearerAuth()
@ApiTags('cards')
@ApiUnauthorizedResponse({
  type: UnauthorizedResponseDto,
  description: 'Não autorizado',
})
@UseGuards(AuthGuard(), RolesGuard)
export class CardsController {
  constructor(
    private readonly monstersService: MonstersService,
    private readonly trapsService: TrapsService,
    private readonly spellsService: SpellsService,
    private readonly usersCardsService: UsersCardsService,
  ) {}

  @Post('monsters')
  @ApiCreatedResponse({ description: 'Carta de monstro criada com sucesso.' })
  @ApiConflictResponse({
    description: 'Uma carta com esse nome já foi cadastrada.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro ao salvar salvar carta no banco de dados.',
  })
  @Role(UserRole.ADMIN)
  async createMonster(
    @Body(ValidationPipe) createMonsterDto: CreateMonsterDto,
  ): Promise<ReturnCardDto> {
    const card = await this.monstersService.create(createMonsterDto);
    return {
      card,
      message: 'Carta de monstro criada com sucesso.',
    };
  }

  @Post('traps')
  @ApiCreatedResponse({ description: 'Carta armadilha criada com sucesso.' })
  @ApiConflictResponse({
    description: 'Uma carta com esse nome já foi cadastrada.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro ao salvar salvar carta no banco de dados.',
  })
  @Role(UserRole.ADMIN)
  async createTrap(
    @Body(ValidationPipe) createTrapDto: CreateTrapDto,
  ): Promise<ReturnCardDto> {
    const card = await this.trapsService.create(createTrapDto);
    return {
      card,
      message: 'Carta armadilha criada com sucesso',
    };
  }

  @Post('spells')
  @ApiCreatedResponse({ description: 'Carta mágica criada com sucesso.' })
  @ApiConflictResponse({
    description: 'Uma carta com esse nome já foi cadastrada.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro ao salvar salvar carta no banco de dados.',
  })
  @Role(UserRole.ADMIN)
  async createSpell(
    @Body(ValidationPipe) createSpellDto: CreateSpellDto,
  ): Promise<ReturnCardDto> {
    const card = await this.spellsService.create(createSpellDto);
    return {
      card,
      message: 'Carta magica criada com sucesso',
    };
  }

  @Patch('/add-spells-cards-user')
  @ApiOkResponse({
    description:
      'Retorna um objeto do tipo UserSpell que é a carta que foi adicionada.',
    type: [UserSpell],
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro ao salvar a(s) carta(s) no banco de dados.',
  })
  async addSpellCard(
    @GetUser() user: User,
    @Body(ValidationPipe) addCardUserDto: AddCardInUserDto,
  ) {
    return await this.usersCardsService.addSpellsCardsInUserCards(
      addCardUserDto,
      user.cards.id,
    );
  }

  @Patch('/add-traps-cards-user')
  @ApiOkResponse({
    description:
      'Retorna um objeto do tipo UserTrap que é a carta que foi adicionada.',
    type: [UserTrap],
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro ao salvar a(s) carta(s) no banco de dados.',
  })
  async addTrapCard(
    @GetUser() user: User,
    @Body(ValidationPipe) addCardUserDto: AddCardInUserDto,
  ) {
    return await this.usersCardsService.addTrapsCardsInUserCards(
      addCardUserDto,
      user.cards.id,
    );
  }

  @Patch('/add-monsters-cards-user')
  @ApiOkResponse({
    description:
      'Retorna um objeto do tipo UserMonster que é a carta que foi adicionada.',
    type: [UserMonster],
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro ao salvar a(s) carta(s) no banco de dados.',
  })
  async addCard(
    @GetUser() user: User,
    @Body(ValidationPipe) addCardUserDto: AddCardInUserDto,
  ) {
    return await this.usersCardsService.addMonstersCardsInUserCards(
      addCardUserDto,
      user.cards.id,
    );
  }

  @Patch('/remove-card-user')
  @ApiOkResponse({
    description:
      'Retorna a carta que foi removida em forma de objeto do tipo UserMonster, UserSpell ou UserTrap.',
    type: RemoveCardInUserResponse,
  })
  @ApiNotFoundResponse({ description: 'Carta não encontrada.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro ao remover carta no banco de dados.',
  })
  async removeCardInUserCards(
    @GetUser() user: User,
    @Body(ValidationPipe) removeCardUserDto: RemoveCardInUserDto,
  ) {
    return await this.usersCardsService.removeCardInUserCards(
      removeCardUserDto,
      user,
    );
  }

  @Delete('/spells/:id')
  @ApiOkResponse({
    description: 'Carta removida com sucesso.',
  })
  @ApiNotFoundResponse({
    description: 'Não foi encontrada a carta do ID informado.',
  })
  @Role(UserRole.ADMIN)
  async removeSpell(@Param('id') id: string) {
    await this.spellsService.remove(id);
    return {
      message: 'Carta removida com sucesso.',
    };
  }

  @Delete('/traps/:id')
  @ApiOkResponse({
    description: 'Carta removida com sucesso.',
  })
  @ApiNotFoundResponse({
    description: 'Não foi encontrada a carta do ID informado',
  })
  @Role(UserRole.ADMIN)
  async removeTrap(@Param('id') id: string) {
    await this.trapsService.remove(id);
    return {
      message: 'Carta removida com sucesso',
    };
  }

  @Delete('/monsters/:id')
  @ApiOkResponse({
    description: 'Carta removida com sucesso.',
  })
  @ApiNotFoundResponse({
    description: 'Não foi encontrada a carta do ID informado',
  })
  @Role(UserRole.ADMIN)
  async removeMonster(@Param('id') id: string) {
    await this.monstersService.remove(id);
    return {
      message: 'Carta removida com sucesso',
    };
  }
}
