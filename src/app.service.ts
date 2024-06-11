import { Injectable } from '@nestjs/common';
import { MyLogger } from './logger/logger.service';

@Injectable()
export class AppService {
  constructor(private readonly logger: MyLogger) {}
  getHello(): string {
    this.logger.log('Hello World!');
    return 'Hello World!';
  }
}
