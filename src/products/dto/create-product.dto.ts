import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'The name of a product.' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The details of a product.' })
  @IsString()
  readonly details: string;

  @ApiProperty({ description: 'The number of likes of a product' })
  @IsNumber()
  @IsOptional()
  readonly likes: number = 0;

  @ApiProperty({ description: 'The image of a product' })
  @IsString()
  @IsOptional()
  readonly image: string = '';

  @ApiProperty({ description: 'if a product is enabled' })
  @IsBoolean()
  @IsOptional()
  readonly isEnabled: boolean = true;
}
