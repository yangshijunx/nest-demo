import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [UsersService, ConfigService],
  controllers: [UsersController],
  exports: [UsersService], // 导出UsersService，以便在其他模块中使用
})
export class UsersModule {}
