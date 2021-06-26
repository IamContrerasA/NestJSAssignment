import { IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../enum/user-enum';
export class CreateUserDto {
  @ApiProperty({ description: 'The email of a user.' })
  @IsString()
  readonly email: string;

  @ApiProperty({ description: 'The password of a user.' })
  @IsString()
  readonly password: string;

  @ApiProperty({ enum: ['manager', 'client'] })
  @IsEnum(UserRole)
  readonly role: UserRole;
}
