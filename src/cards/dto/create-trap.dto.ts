import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { CreateCardDto } from './create-card.dto';
import { TrapSymbol } from '../trap-symbol.enum';

export class CreateTrapDto extends CreateCardDto {
  @IsNotEmpty({
    message: 'Informe o tempo de duração do efeito',
  })
  @IsInt()
  effectDuration: number;

  @IsNotEmpty({
    message: 'Informe o simbolo',
  })
  @IsEnum(TrapSymbol)
  symbol: TrapSymbol;
}
