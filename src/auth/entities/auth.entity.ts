import { ApiProperty } from '@nestjs/swagger';

export class AuthEntity {
  @ApiProperty()
  accessToken: string;

  constructor(partial: Partial<AuthEntity>) {
    Object.assign(this, partial);
  }
}
