import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  limit?: number;

  @IsOptional()
  @IsPositive()
  offset?: number;

  @ApiProperty({
    description: 'If you set a category, dont set a limit or offset',
  })
  @IsOptional()
  category?: string;
}
