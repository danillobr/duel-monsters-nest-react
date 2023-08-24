import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Monster } from './entities/monster.entities';
import { CreateMonsterDto } from './dto/create-monster.dto';

@Injectable()
export class CardsService {
  create(createCardDto: CreateCardDto) {
    if (createCardDto instanceof CreateCardDto) {
      console.log('Deu certo!');
    } else {
      console.log(createCardDto);
      console.log('Não deu certo!');
    }
  }

  // async create(createUserDto: CreateUserDto): Promise<User> {
  //   if (createUserDto.password != createUserDto.passwordConfirmation) {
  //     throw new UnprocessableEntityException('As senhas não conferem');
  //   } else {
  //     return await this.userRepository.createUser(
  //       createUserDto,
  //       UserRole.ADMIN,
  //     );
  //   }
  // }

  findAll() {
    return `This action returns all cards`;
  }

  findOne(id: number) {
    return `This action returns a #${id} card`;
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card`;
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
