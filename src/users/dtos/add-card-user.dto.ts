import { IsNotEmpty, IsUUID } from 'class-validator';

export class AddCardUserDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
