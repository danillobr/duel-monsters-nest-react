import { Injectable } from '@nestjs/common';
import { Player } from './entities/player.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlayerDto } from './dto/create-player.dto';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}
  async create(data: CreatePlayerDto): Promise<Player> {
    return await this.playerRepository.save(this.playerRepository.create(data));
  }
  async findByEmail(email: string): Promise<Player> {
    return await this.playerRepository.findOne({ email });
  }
}
