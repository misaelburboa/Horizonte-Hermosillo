import { Body, Controller, Param, Post } from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CreateEventDto } from './dto/create-event.dto';
import { EventAttendeeRegisterDto } from './dto/event-attendee-register.dto';
import { EventsService } from './events.service';

@Serialize(CreateEventDto)
@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Post()
  create(@Body() event: CreateEventDto) {
    this.eventsService.create(event);
    return event;
  }

  @Post('/:id/register')
  registerAttendeeToEvent(
    @Param('id') id: string,
    @Body() attendee: EventAttendeeRegisterDto,
  ) {
    this.eventsService.registerAttendeeToEvent(id, attendee);
  }
}
