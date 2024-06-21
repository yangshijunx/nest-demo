import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '@/users/users.service';
import { AuthGuard } from './jwt-auth.guard';
import { SkipAuth } from '@/common/skipAuth';

interface SigninDto {
  username: string;
  password: string;
}
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() signinDto: SigninDto) {
    const user = await this.authService.sinIn(
      signinDto.username,
      signinDto.password,
    );
    if (user) {
      console.log('校验通过1', user);
      const permissions = await this.userService.getUserPermissions(user);
      console.log('校验通过', permissions);
      const role = user.roles[0];
      const { access_token, refreshToken } = await this.authService.login(user);
      return {
        user,
        permissions,
        role,
        access_token,
        refreshToken,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile() {
    return {
      user: 'test',
    };
  }
}
