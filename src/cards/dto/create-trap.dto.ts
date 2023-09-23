import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { CreateCardDto } from './create-card.dto';
import { TrapSymbol } from '../enum/trap-symbol.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrapDto extends CreateCardDto {
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
    description: 'Símbolo da carta armadilha.',
    example: 'SEM SIMBOLO',
    enum: TrapSymbol,
  })
  @IsNotEmpty({
    message: 'Informe o símbolo',
  })
  @IsEnum(TrapSymbol)
  symbol: TrapSymbol;
}
