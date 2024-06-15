// src/common/exceptions/my-custom.exception.ts

import { HttpException, HttpStatus } from '@nestjs/common';

export class MyCustomHttpException extends HttpException {
  constructor(
    message: string = 'An error occurred',
    statusCode: number = HttpStatus.BAD_GATEWAY,
  ) {
    super(
      {
        code: statusCode,
        message: message, // Use the custom message passed to the constructor
      },
      statusCode,
    );
  }
}
