import { Controller, Patch, Query, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { EventsService } from './events.service';

@Controller('register')
@UseFilters(HttpExceptionFilter)
export class RegisterController {
  constructor(private eventsService: EventsService) {}

  // TODO: Expose only properties needed
  // TODO: this code should be generated when requested, for now its fine this way
  // but we should handle the request cancellation code, then using it in another endpoint
  @Patch('cancel')
  async cancelRegister(@Query('code') code: string) {
    return await this.eventsService.cancelRegister(code);
  }
}
