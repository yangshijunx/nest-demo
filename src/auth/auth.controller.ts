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
import { AuthGuard } from './jwt-auth.guard';

interface SigninDto {
  username: string;
  password: string;
}
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() signinDto: SigninDto) {
    return this.authService.sinIn(signinDto.username, signinDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile() {
    return {
      user: 'test',
    };
  }
}
