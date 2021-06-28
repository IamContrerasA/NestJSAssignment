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
  Request,
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private authService: AuthService,
  ) {}

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
  async create(@Body() createProductDto: CreateProductDto, @Request() req) {
    await this.authService.protectedRoutesClient(req.user);

    return this.productsService.create(createProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Request() req,
  ) {
    await this.authService.protectedRoutesClient(req.user);
    return this.productsService.update(id, updateProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    await this.authService.protectedRoutesClient(req.user);
    return this.productsService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/enabled')
  async isEnabled(@Param('id') id: string, @Request() req) {
    await this.authService.protectedRoutesClient(req.user);
    return this.productsService.isEnabled(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/add-image')
  async addImage(
    @Param('id') id: string,
    @Body() addImage: UpdateProductDto,
    @Request() req,
  ) {
    await this.authService.protectedRoutesClient(req.user);
    return this.productsService.addImage(id, addImage);
  }

  @Get(':id/details')
  details(@Param('id') id: string) {
    return this.productsService.details(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/add-car')
  async addCar(@Param('id') id: string, @Request() req) {
    await this.authService.protectedRoutes(req.user);
    return this.productsService.addCar(id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/liked')
  async liked(@Param('id') id: string, @Request() req) {
    await this.authService.protectedRoutes(req.user);
    return this.productsService.liked(id);
  }
}
