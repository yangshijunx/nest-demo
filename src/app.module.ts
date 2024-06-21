import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';
import { UsersModule } from './users/users.module';
import { OrderModule } from './order/order.module';
import * as path from 'path';
// 配置
import { ConfigModule, ConfigService } from '@nestjs/config';
// 引入typeorm
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
// 引入user实体
// import { User } from './entities/user/user.entity';
// 订单order实体
// import { Order } from './entities/order/order.entity';
import { AuthModule } from './auth/auth.module';
// 校验环境变量
import * as Joi from 'joi';

// 全局应用拦截器
import { TransformInterceptor } from '@/common/interceptors/transform.interceptor';
// 全局异常过滤器
import { AllExceptionsFilter } from '@/common/filters/all-exceptions.filter';

// jwt校验
import { AuthGuard } from '@/auth/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
// 国际化
import {
  I18nModule,
  I18nJsonLoader,
  HeaderResolver,
  AcceptLanguageResolver,
  QueryResolver,
} from 'nestjs-i18n';

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
    // typeorm配置
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'root',
    //   database: 'nest-demo',
    //   // 要加载并用于此数据源的实体或实体模式。
    //   entities: [],
    //   synchronize: true, // 指示是否应在每次启动应用程序时自动创建数据库架构。请谨慎使用此选项，不要在生产环境中使用 - 否则可能会丢失生产数据。
    // }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): TypeOrmModuleOptions => ({
        // 配置类型可以使用上面的 Joi 进行校验
        type: config.get<'mysql' | 'mariadb' | 'postgres' | 'sqlite'>(
          'DTEST_DB_TYPE',
        ),
        host: config.get<string>('DTEST_DB_HOST'),
        port: config.get<number>('DTEST_DB_PORT'),
        username: config.get<string>('DTEST_DB_USER'),
        password: config.get<string>('DTEST_DB_PASSWORD'),
        database: config.get<string>('DTEST_DB_NAME'),
        // entities: [User, Order],
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: config.get<boolean>('DTEST_DB_SYNCHRONIZE'),
      }),
    }),
    AuthModule,
    JwtModule,
    I18nModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        fallbackLanguage: config.get<string>('DTEST_APP_LANG'),
        loaderOptions: {
          path: path.join(__dirname, '/i18n/'),
          watch: true,
        },
        loader: I18nJsonLoader,
      }),
      resolvers: [
        new HeaderResolver(['x-language']), // 从自定义头 `X-Language` 中解析语言
        { use: QueryResolver, options: ['language'] }, // 从查询参数 `lang` 中解析语言
        AcceptLanguageResolver, // 从 `Accept-Language` 头中解析语言
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    // 全局校验
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
