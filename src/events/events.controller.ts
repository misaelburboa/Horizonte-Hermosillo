import { Body, Controller, Post } from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CreateEventDto } from './dto/create-event.dto';

@Serialize(CreateEventDto)
@Controller('events')
export class EventsController {
  @Post()
  create(@Body() event: CreateEventDto) {
    console.log(event)
    return event;
  }
}
