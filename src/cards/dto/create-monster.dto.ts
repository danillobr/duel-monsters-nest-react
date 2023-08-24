import { IsBoolean, IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { CreateCardDto } from './create-card.dto';

export class CreateMonsterDto extends CreateCardDto {
  @IsNotEmpty({
    message: 'Informe o poder de ataque do monstro',
  })
  @IsInt()
  atk: number;

  @IsNotEmpty({
    message: 'Informe o poder de defesa do monstro',
  })
  @IsInt()
  def: number;

  @IsNotEmpty({
    message: 'Informe o nivel de estrelas do monstro',
  })
  @IsInt()
  @Min(1)
  @Max(12)
  level: number;

  @IsNotEmpty({
    message: 'Confirme se o monstro possui habilidade especial',
  })
  @IsBoolean()
  specialAbility: boolean;
}
