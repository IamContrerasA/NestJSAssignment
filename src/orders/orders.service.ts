import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  findAll() {
    return this.orderRepository.find({
      relations: ['user', 'products'],
    });
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOne(id, {
      relations: ['user', 'products'],
    });
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }

  async showOrder() {
    const fakeUser = {
      id: 3,
      email: 'email@email.com',
      password: 'password',
      role: 'role',
    };

    const currentOrder = await this.orderRepository.findOne(
      {
        user: fakeUser,
        approved: false,
      },
      { relations: ['user', 'products'] },
    );

    return currentOrder;
  }

  async create(createOrderDto: CreateOrderDto) {
    const order = this.orderRepository.create({
      ...createOrderDto,
    });
    return this.orderRepository.save(order);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.preload({
      id: +id,
      ...updateOrderDto,
    });
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return this.orderRepository.save(order);
  }

  async remove(id: string) {
    const order = await this.findOne(id);
    return this.orderRepository.remove(order);
  }
}
