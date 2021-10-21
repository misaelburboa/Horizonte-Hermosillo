import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CreateEventDto } from './dto/create-event.dto';
import { EventAttendeeRegisterDto } from './dto/event-attendee-register.dto';
import { EventsService } from './events.service';

@Controller('events')
@UseInterceptors(ClassSerializerInterceptor)
export class EventsController {
  constructor(private eventsService: EventsService) {}
  @Get()
  getAllEvents() {
    this.eventsService.getAll();
  }

  @Get('/:id')
  async getEvent(@Param('id') id: string) {
    return await this.eventsService.get(id);
  }

  @Serialize(CreateEventDto)
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
