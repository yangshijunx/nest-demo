import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class OrderService {
  constructor(private readonly usersService: UsersService) {}
  async findAllOrdersForUser(userId: number) {
    const user = await this.usersService.findOne(+userId);
    // 这里假设我们有一些订单数据
    const orders = [
      { id: 1, userId: 1, item: 'Book' },
      { id: 2, userId: 1, item: 'Pen' },
    ];
    return orders.filter((order) => order.userId === user.id);
  }
}
