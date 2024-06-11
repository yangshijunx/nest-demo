import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(private readonly configService: ConfigService) {}
  private users = [{ id: 1, name: 'John Doe' }];
  findAll() {
    return this.users;
  }
  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }
  // 获取配置
  getConfig() {
    const testUser = this.configService.get<string>('DTEST_USER');
    return {
      testUser,
    };
  }
}
