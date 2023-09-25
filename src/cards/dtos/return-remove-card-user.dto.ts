import { ApiProperty } from '@nestjs/swagger';
import { UserMonster } from '../entities/user-monster.entity';
import { UserSpell } from '../entities/user-spell.entity';
import { UserTrap } from '../entities/user-trap.entity';

export class RemoveCardInUserResponse {
  @ApiProperty({ type: UserMonster })
  monster: UserMonster;

  @ApiProperty({ type: UserSpell })
  spell: UserSpell;

  @ApiProperty({ type: UserTrap })
  trap: UserTrap;
}
