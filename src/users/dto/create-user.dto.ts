import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({ description: 'The email of a user.' })
  @IsString()
  readonly email: string;

  @ApiProperty({ description: 'The password of a user.' })
  @IsString()
  readonly password: string;

  @ApiProperty({ description: 'The role of a user.' })
  @IsString()
  readonly role: string;
}
