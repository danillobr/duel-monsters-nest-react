import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { CreateCardDto } from './create-card.dto';
import { SpellSymbol } from '../enum/spell-symbol.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSpellDto extends CreateCardDto {
  @ApiProperty({
    description: 'O tempo de duração do efeito.',
    example: 1,
  })
  @IsNotEmpty({
    message: 'Informe o tempo de duração do efeito',
  })
  @IsInt()
  effectDuration: number;

  @ApiProperty({
    description: 'Símbolo da carta mágica.',
    example: 'RAIO',
    enum: SpellSymbol,
  })
  @IsNotEmpty({
    message: 'Informe o simbolo',
  })
  @IsEnum(SpellSymbol)
  symbol: SpellSymbol;
}
