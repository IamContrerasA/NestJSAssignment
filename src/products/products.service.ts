import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset, category } = paginationQuery;
    const filters: any = {
      skip: limit ? limit : 0,
      take: offset ? offset : 0,
    };
    if (category) {
      filters.category = category;
      delete filters.skip;
      delete filters.take;
    }
    console.log(filters);
    return this.productRepository.find(filters);
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create({
      ...createProductDto,
    });
    return this.productRepository.save(product);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.preload({
      id: +id,
      ...updateProductDto,
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return this.productRepository.save(product);
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    return this.productRepository.remove(product);
  }

  async isEnabled(id: string) {
    const product = await this.productRepository.preload({
      id: +id,
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return this.productRepository.save({
      ...product,
      isEnabled: !product.isEnabled,
    });
  }

  async addImage(id: string, addImage: UpdateProductDto) {
    const product = await this.productRepository.preload({
      id: +id,
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    console.log(addImage);
    return this.productRepository.save({
      ...product,
      image: addImage.image,
    });
  }
}
