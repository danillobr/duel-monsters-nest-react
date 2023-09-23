import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsUUID, Max, Min } from 'class-validator';
import { v4 as uuidV4 } from 'uuid';

export class RemoveCardInUserDto {
  @ApiProperty({
    description: 'Informe o id da carta.',
    example: uuidV4(),
  })
  @IsUUID()
  @IsNotEmpty({ message: 'informe o id da carta' })
  cardId: string;

  @ApiProperty({
    description: 'informe a quantidade de cartas a serem removidas.',
    example: 2,
  })
  @IsInt()
  @Min(1)
  @IsNotEmpty({ message: 'informe a quantidade de cartas' })
  amount: number;
}
