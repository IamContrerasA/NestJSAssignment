import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OrdersService } from './orders.service';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    await this.authService.protectedRoutesClient(req.user);
    return this.ordersService.findAll(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/show-order')
  async showOrder(@Request() req) {
    await this.authService.protectedRoutes(req.user);
    return this.ordersService.showOrder(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/show-orders')
  async showOrders(@Request() req) {
    await this.authService.protectedRoutes(req.user);
    return this.ordersService.showOrders(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/buy-order')
  async buyOrder(@Request() req) {
    await this.authService.protectedRoutes(req.user);
    return this.ordersService.buyOrder(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/show-order/:id')
  async showClientOrder(@Param('id') id: string, @Request() req) {
    await this.authService.protectedRoutesClient(req.user);
    return this.ordersService.showClientOrder(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    await this.authService.protectedRoutesClient(req.user);
    return this.ordersService.findOne(id);
  }
}
