import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('/show-order')
  showOrder() {
    return this.ordersService.showOrder();
  }

  @Get('/show-orders')
  showOrders() {
    return this.ordersService.showOrders();
  }

  @Post('/buy-order')
  buyOrder() {
    return this.ordersService.buyOrder();
  }

  @Get('/show-order/:id')
  showClientOrder(@Param('id') id: string) {
    return this.ordersService.showClientOrder(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }
}
