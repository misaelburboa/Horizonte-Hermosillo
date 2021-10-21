import { HttpException, HttpStatus } from '@nestjs/common';

export class NoSeatAvailableException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.CONFLICT);
  }
}
