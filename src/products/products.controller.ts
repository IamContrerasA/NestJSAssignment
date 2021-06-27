import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.productsService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/enabled')
  isEnabled(@Param('id') id: string) {
    return this.productsService.isEnabled(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/add-image')
  addImage(@Param('id') id: string, @Body() addImage: UpdateProductDto) {
    return this.productsService.addImage(id, addImage);
  }

  @Get(':id/details')
  details(@Param('id') id: string) {
    return this.productsService.details(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/add-car')
  addCar(@Param('id') id: string) {
    return this.productsService.addCar(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/liked')
  liked(@Param('id') id: string) {
    return this.productsService.liked(id);
  }
}
