import { IsBoolean, IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { CreateCardDto } from './create-card.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMonsterDto extends CreateCardDto {
  @ApiProperty({
    description: 'Poder de ataque do monstro.',
    example: 2500,
  })
  @IsNotEmpty({
    message: 'Informe o poder de ataque do monstro',
  })
  @IsInt()
  atk: number;

  @ApiProperty({
    description: 'Poder de defesa do monstro.',
    example: 2100,
  })
  @IsNotEmpty({
    message: 'Informe o poder de defesa do monstro',
  })
  @IsInt()
  def: number;

  @ApiProperty({
    description: 'Nível de estrelas do monstro.',
    example: 7,
  })
  @IsNotEmpty({
    message: 'Informe o nivel de estrelas do monstro',
  })
  @IsInt()
  @Min(1)
  @Max(12)
  level: number;

  @ApiProperty({
    description: 'Se o mostro tem habilidades especiais.',
    example: false,
  })
  @IsNotEmpty({
    message: 'Confirme se o monstro possui habilidade especial',
  })
  @IsBoolean()
  specialAbility: boolean;
}
