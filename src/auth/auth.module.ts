import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [UsersModule],
  providers: [AuthService, ConfigService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
