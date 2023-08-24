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
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  async create(
    @Body(ValidationPipe) createCardDto: CreateCardDto,
  ): Promise<void> {
    // return this.cardsService.create(createCardDto);
    const card = await this.cardsService.create(createCardDto);
  }

  // async createAdminUser(
  //   @Body(ValidationPipe) createUserDto: CreateUserDto,
  // ): Promise<ReturnUserDto> {
  //   const user = await this.usersService.createAdminUser(createUserDto);
  //   return {
  //     user,
  //     message: 'Administrador cadastrado com sucesso',
  //   };
  // }

  @Get()
  findAll() {
    return this.cardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(+id, updateCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardsService.remove(+id);
  }
}
