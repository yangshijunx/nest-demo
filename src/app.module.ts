import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';
import { UsersModule } from './users/users.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [LoggerModule, UsersModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
