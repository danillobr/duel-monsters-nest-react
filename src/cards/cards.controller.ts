import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
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

@Controller('cards')
@UseGuards(AuthGuard(), RolesGuard)
export class CardsController {
  constructor(
    private readonly monstersService: MonstersService,
    private readonly trapsService: TrapsService,
    private readonly spellsService: SpellsService,
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
