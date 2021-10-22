import { Controller, Patch, Query, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { EventsService } from './events.service';

@Controller('register')
@UseFilters(HttpExceptionFilter)
export class RegisterController {
  constructor(private eventsService: EventsService) {}

  // TODO: Expose only properties needed
  @Patch('cancel')
  async cancelRegister(@Query('code') code: string) {
    return await this.eventsService.cancelRegister(code);
  }
}
