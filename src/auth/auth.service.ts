import { Injectable, UnauthorizedException } from '@nestjs/common'; // HttpStatus
import { UsersService } from '@/users/users.service';
// 自定义返回异常结果
// import { MyCustomHttpException } from '@/common/exceptions/my-custom-http.exception';
import { I18nContext, I18nService } from 'nestjs-i18n';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly i18n: I18nService,
  ) {}

  async sinIn(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username);

    // 这里应该进行密码验证
    if (user && user.password === password) {
      return user;
    } else {
      // console.log(
      //   '测试',
      //   I18nContext.current().lang,
      //   this.i18n.t('HELLO', { lang: I18nContext.current().lang }),
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
