import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
  ValidationPipe,
} from '@nestjs/common';
import { DecksService } from './decks.service';
import { CreateDeckDto } from './dto/create-deck.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { GetUser } from '../auth/decorations/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { ReturnDeckDto } from './dto/return-deck.dto';
import { AddCardInDeckDto } from '../users/dtos/add-card-deck.dto';
import { RemoveCardInDeckDto } from 'src/users/dtos/remove-card-deck-user.dto';

@Controller('decks')
@UseGuards(AuthGuard(), RolesGuard)
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  @Post()
  async create(
    @Body() createDeckDto: CreateDeckDto,
    @GetUser() user: User,
  ): Promise<ReturnDeckDto> {
    const deck = await this.decksService.create(createDeckDto, user);
    return {
      deck,
      message: 'Deck criado com sucesso',
    };
  }

  @Patch('/add-card-deck')
  async addCardInDeck(
    @GetUser() user: User,
    @Body(ValidationPipe) addCardDeckUserDto: AddCardInDeckDto,
  ) {
    return await this.decksService.addCardInDeck(addCardDeckUserDto, user);
  }

  @Patch('/remove-card-deck')
  async removeCardDeck(
    @GetUser() user: User,
    @Body(ValidationPipe) removeCardDeckUserDto: RemoveCardInDeckDto,
  ) {
    return await this.decksService.removeCardInDeck(
      removeCardDeckUserDto,
      user,
    );
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    await this.decksService.remove(id);
    return {
      message: 'Deck removido com sucesso',
    };
  }
}
