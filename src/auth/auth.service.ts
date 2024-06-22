import { Injectable, UnauthorizedException } from '@nestjs/common'; // HttpStatus
import { UsersService } from '@/users/users.service';
// 自定义返回异常结果
// import { MyCustomHttpException } from '@/common/exceptions/my-custom-http.exception';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/entities/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly i18n: I18nService,
    private readonly jwtService: JwtService,
  ) {}

  // 校验登录用户
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // 登录
  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }), // 可根据需求设置刷新令牌的过期时间
    };
  }

  async sinIn(username: string, password: string) {
    const user = await this.validateUser(username, password);

    // 这里应该进行密码验证
    if (user) {
      // 生成token
      // const payload = { username, sub: user.id };
      // const token = this.login(payload);
      return {
        ...user,
      };
      // return user;
    } else {
      // console.log(
      //   '测试',
      //   I18nContext.current().lang,
      //   // 路径.key
      //   this.i18n.t('sys.test.HELLO', { lang: I18nContext.current().lang }),
      // );
      throw new UnauthorizedException();
      // 或者自定义异常
      //   throw new MyCustomHttpException(
      //     '用户名或密码错误',
      //     HttpStatus.UNAUTHORIZED,
      //   );
    }
  }
}
