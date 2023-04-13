import { Body, Controller, Post } from '@nestjs/common';

import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';

@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    this.playerService.create(createPlayerDto);
  }
}
