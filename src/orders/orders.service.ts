import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

  async showClientOrder(id: string) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    const userOrders = await this.orderRepository.find({
      relations: ['user', 'products'],
      where: {
        user,
      },
    });

    return userOrders;
  }
}
