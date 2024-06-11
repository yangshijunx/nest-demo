import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';
import { UsersModule } from './users/users.module';
import { OrderModule } from './order/order.module';
// 配置
import { ConfigModule } from '@nestjs/config';
// 校验环境变量
import * as Joi from 'joi';

@Module({
  imports: [
    LoggerModule,
    UsersModule,
    OrderModule,
    ConfigModule.forRoot({
      // 环境变量引入方式指定环境变量文件路径
      // envFilePath: '.env',envFilePath: ['.env', '.env.production'],
      // 不写就是.env默认位置（项目根目录）加载并解析文件
      // 自定义环境变量
      // ignoreEnvFile: true, // 禁用加载环境变量
      // isGlobal: true, // 全局生效
      // 动态加载环境变量
      // envFilePath: process.env.NODE_ENV === 'development' ? '.env' : '.env.production',
      envFilePath: ['.env', `.env.${process.env.NODE_ENV}`],
      // 校验环境变量
      validationSchema: Joi.object({
        // 如果未通过校验则会控制台报错
        DTEST_USER: Joi.string()
          .required()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
      }),
    }),
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
