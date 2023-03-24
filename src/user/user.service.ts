import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaveUserDto } from './dto/save-user.dto';
import { UserEntity } from './models/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async save(data: SaveUserDto): Promise<UserEntity> {
    return await this.userRepository.save(this.userRepository.create(data));
  }
}
