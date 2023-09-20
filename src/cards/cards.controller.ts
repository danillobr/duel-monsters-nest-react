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
import { CreateMonsterDto } from './dto/create-monster.dto';
import { ReturnCardDto } from './dto/return-card.dto';
import { CreateTrapDto } from './dto/create-trap.dto';
import { TrapsService } from './traps.service';
import { SpellsService } from './spells.service';
import { CreateSpellDto } from './dto/create-spell.dto';
import { Role } from '../auth/decorations/role.decorator';
import { UserRole } from '../users/enum/user-roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { GetUser } from '../auth/decorations/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { UsersCardsService } from './users-cards.service';
import { AddCardInUserDto } from '../users/dtos/add-card-user.dto';

@Controller('cards')
@UseGuards(AuthGuard(), RolesGuard)
export class CardsController {
  constructor(
    private monstersService: MonstersService,
    private trapsService: TrapsService,
    private spellsService: SpellsService,
    private usersCardsService: UsersCardsService,
  ) {}

  @Post('monsters')
  @Role(UserRole.ADMIN)
  async createMonster(
    @Body(ValidationPipe) createMonsterDto: CreateMonsterDto,
  ): Promise<ReturnCardDto> {
    const card = await this.monstersService.create(createMonsterDto);
    return {
      card,
      message: 'Carta de monstro criada com sucesso',
    };
  }

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

  @Role(UserRole.ADMIN)
  @Delete('/monsters/:id')
  async removeMonster(@Param('id') id: string) {
    await this.monstersService.remove(id);
    return {
      message: 'Carta removida com sucesso',
    };
  }

  @Role(UserRole.ADMIN)
  @Delete('/traps/:id')
  async removeTrap(@Param('id') id: string) {
    await this.trapsService.remove(id);
    return {
      message: 'Carta removida com sucesso',
    };
  }

  @Role(UserRole.ADMIN)
  @Delete('/spells/:id')
  async removeSpell(@Param('id') id: string) {
    await this.spellsService.remove(id);
    return {
      message: 'Carta removida com sucesso',
    };
  }
}
