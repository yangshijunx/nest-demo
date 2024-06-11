import { Controller, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('user/:userId')
  findAllOrdersForUser(@Param('userId') userId: number) {
    return this.orderService.findAllOrdersForUser(userId);
  }
}
