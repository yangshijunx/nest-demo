import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async sinIn(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username);

    // 这里应该进行密码验证
    if (user && user.password === password) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
}
