import { ApiProperty } from '@nestjs/swagger';

export class ReturnSignInDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY2MDkzM2JiLTMxOTUtNDkyMy04ZWFjLWI5MTEwZjYyM2ZhMCIsImlhdCI6MTY5NTY3ODc2OCwiZXhwIjoxNjk1Njk2NzY4fQ.wYREuTFbVKx5KYEJbFEkZCtMDF-alGmxfHh3NkpsDaA',
  })
  token: string;
}
