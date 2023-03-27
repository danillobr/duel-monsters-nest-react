import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Player } from './entities/player.entity';
import { Admin } from './entities/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Player, Admin])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
