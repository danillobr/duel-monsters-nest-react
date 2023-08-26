import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { UpdateCardDto } from './dto/update-card.dto';
import { MonstersService } from './monsters.service';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { ReturnCardDto } from './dto/return-card.dto';
import { CreateTrapDto } from './dto/create-trap.dto';
import { TrapsService } from './traps.service';
import { SpellsService } from './spells.service';
import { CreateSpellDto } from './dto/create-spell.dto';

@Controller('cards')
export class CardsController {
  constructor(
    private readonly monstersService: MonstersService,
    private readonly trapsService: TrapsService,
    private readonly spellsService: SpellsService,
  ) {}

  @Post('monsters')
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
  async createSpell(
    @Body(ValidationPipe) createSpellDto: CreateSpellDto,
  ): Promise<ReturnCardDto> {
    const card = await this.spellsService.create(createSpellDto);
    return {
      card,
      message: 'Carta magica criada com sucesso',
    };
  }

  @Get()
  findAll() {
    return this.monstersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.monstersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.monstersService.update(+id, updateCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.monstersService.remove(+id);
  }
}
