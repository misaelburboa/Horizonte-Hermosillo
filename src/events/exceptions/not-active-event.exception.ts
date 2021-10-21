import { HttpException, HttpStatus } from '@nestjs/common';

export class NotActiveEventException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.PRECONDITION_REQUIRED);
  }
}
