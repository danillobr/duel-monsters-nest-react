import { IsNotEmpty, IsUUID } from 'class-validator';

export class AddCardUserDto {
  @IsUUID()
  @IsNotEmpty({ message: 'informe o id da carta' })
  id: string;
}
