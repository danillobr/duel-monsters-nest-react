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
import { CreateDeckDto } from './dtos/create-deck.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { GetUser } from '../auth/decorations/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { ReturnDeckDto } from './dtos/return-deck.dto';
import { AddCardInDeckDto } from './dtos/add-card-deck.dto';
import { RemoveCardInDeckDto } from './dtos/remove-card-deck-user.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Deck } from './entities/deck.entity';
import { CreateDeckResponseDto } from './dtos/create-deck-response.dto';
import { UnauthorizedResponseDto } from '../auth/dtos/unauthorized-response.dto';

@Controller('decks')
@ApiBearerAuth()
@ApiTags('decks')
@ApiUnauthorizedResponse({
  type: UnauthorizedResponseDto,
  description: 'Não autorizado',
})
@UseGuards(AuthGuard(), RolesGuard)
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Deck criado com sucesso.',
    type: CreateDeckResponseDto,
  })
  @ApiConflictResponse({
    description: 'Já existe um deck com esse nome.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro ao salvar o deck no banco de dados.',
  })
  async create(
    @Body() createDeckDto: CreateDeckDto,
    @GetUser() user: User,
  ): Promise<ReturnDeckDto> {
    const deck = await this.decksService.create(createDeckDto, user);
    return {
      deck,
      message: 'Deck criado com sucesso.',
    };
  }

  @Patch('/add-card-deck')
  @ApiOkResponse({
    description: 'Retorna o deck que a carta foi adicionada.',
    type: Deck,
  })
  @ApiBadRequestResponse({
    description:
      'Limite máximo de 3 cartas por deck atingido, ou usuário não tem cartas suficientes na sua lista de cartas',
  })
  @ApiNotFoundResponse({
    description:
      'Deck não encontrado ou usuário não possui essa carta na sua lista de cartas.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro ao adicionar a carta ao deck.',
  })
  async addCardInDeck(
    @GetUser() user: User,
    @Body(ValidationPipe) addCardDeckUserDto: AddCardInDeckDto,
  ) {
    return await this.decksService.addCardInDeck(addCardDeckUserDto, user);
  }

  @Patch('/remove-card-deck')
  @ApiOkResponse({
    description: 'Retorna o deck que a carta foi removida.',
    type: Deck,
  })
  @ApiBadRequestResponse({
    description:
      'A quantidade de cartas para remover do deck é maior do que a quantidade de cartas que o deck possui',
  })
  @ApiNotFoundResponse({
    description:
      'Deck não encontrado ou usuário não possui essa carta no deck.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro ao remover a carta do deck.',
  })
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
  @ApiOkResponse({
    description: 'Deck removido com sucesso.',
  })
  @ApiNotFoundResponse({
    description: 'Não foi encontrada o deck do ID informado.',
  })
  async remove(@Param('id') id: string) {
    await this.decksService.remove(id);
    return {
      message: 'Deck removido com sucesso.',
    };
  }
}
