import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { CreateCardDto } from './create-card.dto';
import { SpellSymbol } from '../spell-symbol.enum';

export class CreateSpellDto extends CreateCardDto {
  @IsNotEmpty({
    message: 'Informe o tempo de duração do efeito',
  })
  @IsInt()
  effectDuration: number;

  @IsNotEmpty({
    message: 'Informe o simbolo',
  })
  @IsEnum(SpellSymbol)
  symbol: SpellSymbol;
}
