import { Module } from '@nestjs/common';
import { MyLogger } from './logger.service';

@Module({
  providers: [
    {
      // 这里注入了LoggerModule 等同于 直接写 MyLogger
      // MyLogger 键名 和 值 一致
      provide: MyLogger,
      useClass: MyLogger,
    },
  ],
  exports: [MyLogger],
})
export class LoggerModule {}
