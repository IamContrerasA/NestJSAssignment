import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateOrderDto {
  @ApiProperty({ description: 'The user of a order' })
  readonly user: User;

  @ApiProperty({ description: 'Check of the order is aprroved or not' })
  @IsBoolean()
  @IsOptional()
  readonly approved: boolean = false;

  @ApiProperty({ example: [] })
  readonly products: Product[];
}
