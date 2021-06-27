import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OrdersService } from './orders.service';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.ordersService.findAll(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/show-order')
  showOrder() {
    return this.ordersService.showOrder();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/show-orders')
  showOrders() {
    return this.ordersService.showOrders();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/buy-order')
  buyOrder() {
    return this.ordersService.buyOrder();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/show-order/:id')
  showClientOrder(@Param('id') id: string) {
    return this.ordersService.showClientOrder(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }
}
