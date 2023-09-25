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
import { RolesGuard } from '../auth/roles.guard';
import { GetUser } from '../auth/decorations/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { UsersCardsService } from './users-cards.service';
import { AddCardInUserDto } from './dtos/add-card-user.dto';
import { RemoveCardInUserDto } from './dtos/remove-card-user.dto';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserSpell } from './entities/user-spell.entity';
import { UserTrap } from './entities/user-trap.entity';
import { UserMonster } from './entities/user-monster.entity';
import { RemoveCardInUserResponse } from './dtos/return-remove-card-user.dto';
import { Monster } from './entities/monster.entity';
import { Spell } from './entities/spell.entity';
import { Trap } from './entities/trap.entity';

@ApiBearerAuth()
@ApiTags('cards')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@Controller('cards')
@UseGuards(AuthGuard(), RolesGuard)
export class CardsController {
  constructor(
    private monstersService: MonstersService,
    private trapsService: TrapsService,
    private spellsService: SpellsService,
    private usersCardsService: UsersCardsService,
  ) {}

  @ApiCreatedResponse({ description: 'Carta de monstro criada com sucesso.' })
  @ApiConflictResponse({
    description: 'Uma carta com esse nome já foi cadastrada.',
  })
  @Post('monsters')
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

  @ApiCreatedResponse({ description: 'Carta armadilha criada com sucesso.' })
  @ApiConflictResponse({
    description: 'Uma carta com esse nome já foi cadastrada.',
  })
  @Post('traps')
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

  @ApiCreatedResponse({ description: 'Carta mágica criada com sucesso.' })
  @ApiConflictResponse({
    description: 'Uma carta com esse nome já foi cadastrada.',
  })
  @Post('spells')
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

  @ApiOkResponse({
    description:
      'Retorna um objeto do tipo UserSpell que é a carta que foi adicionada.',
    type: [UserSpell],
  })
  @Patch('/add-spells-cards-user')
  async addSpellCard(
    @GetUser() user: User,
    @Body(ValidationPipe) addCardUserDto: AddCardInUserDto,
  ) {
    return await this.usersCardsService.addSpellsCardsInUserCards(
      addCardUserDto,
      user.cards.id,
    );
  }

  @ApiOkResponse({
    description:
      'Retorna um objeto do tipo UserTrap que é a carta que foi adicionada.',
    type: [UserTrap],
  })
  @Patch('/add-traps-cards-user')
  async addTrapCard(
    @GetUser() user: User,
    @Body(ValidationPipe) addCardUserDto: AddCardInUserDto,
  ) {
    return await this.usersCardsService.addTrapsCardsInUserCards(
      addCardUserDto,
      user.cards.id,
    );
  }

  @ApiOkResponse({
    description:
      'Retorna um objeto do tipo UserMonster que é a carta que foi adicionada.',
    type: [UserMonster],
  })
  @Patch('/add-monsters-cards-user')
  async addCard(
    @GetUser() user: User,
    @Body(ValidationPipe) addCardUserDto: AddCardInUserDto,
  ) {
    return await this.usersCardsService.addMonstersCardsInUserCards(
      addCardUserDto,
      user.cards.id,
    );
  }

  @ApiOkResponse({
    description:
      'Retorna a carta que foi removida em forma de objeto do tipo UserMonster, UserSpell ou UserTrap.',
    type: RemoveCardInUserResponse,
  })
  @Patch('/remove-card-user')
  async removeCardInUserCards(
    @GetUser() user: User,
    @Body(ValidationPipe) removeCardUserDto: RemoveCardInUserDto,
  ) {
    return await this.usersCardsService.removeCardInUserCards(
      removeCardUserDto,
      user,
    );
  }

  @ApiOkResponse({
    description:
      'Retorna um objeto do tipo Monster referente a carta removida.',
    type: Monster,
  })
  @ApiNotFoundResponse({
    description: 'Não foi encontrada a carta do ID informado',
  })
  @Role(UserRole.ADMIN)
  @Delete('/monsters/:id')
  async removeMonster(@Param('id') id: string) {
    await this.monstersService.remove(id);
    return {
      message: 'Carta removida com sucesso',
    };
  }

  @ApiOkResponse({
    description: 'Retorna um objeto do tipo Trap referente a carta removida.',
    type: Trap,
  })
  @ApiNotFoundResponse({
    description: 'Não foi encontrada a carta do ID informado',
  })
  @Role(UserRole.ADMIN)
  @Delete('/traps/:id')
  async removeTrap(@Param('id') id: string) {
    await this.trapsService.remove(id);
    return {
      message: 'Carta removida com sucesso',
    };
  }

  @ApiOkResponse({
    description: 'Retorna um objeto do tipo Spell referente a carta removida.',
    type: Spell,
  })
  @ApiNotFoundResponse({
    description: 'Não foi encontrada a carta do ID informado',
  })
  @Role(UserRole.ADMIN)
  @Delete('/spells/:id')
  async removeSpell(@Param('id') id: string) {
    await this.spellsService.remove(id);
    return {
      message: 'Carta removida com sucesso',
    };
  }
}
