import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async findById(id: string): Promise<User> {
    return await this.userRepository.findOne(id);
  }
  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ email });
  }
}
