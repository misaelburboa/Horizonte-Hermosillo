import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { CreateEventDto } from './dto/create-event.dto';
import { EventAttendeeRegisterDto } from './dto/event-attendee-register.dto';
import { PaginationDto } from './dto/pagination.dto';
import { EventsService } from './events.service';

@Controller('events')
@UseInterceptors(ClassSerializerInterceptor)
@UseFilters(HttpExceptionFilter)
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  async getAllEvents(@Query() params: PaginationDto) {
    return await this.eventsService.getAll(params);
  }

  @Get('/:id')
  async getEvent(@Param('id') id: string) {
    return await this.eventsService.get(id);
  }
  @Get('/:id/attendees')
  async getEventAttendees(@Param('id') eventId: string) {
    const attendees = await this.eventsService.getEventAttendees(eventId);
    console.log(attendees);
    return attendees;
  }

  @Post()
  async create(@Body() event: CreateEventDto) {
    return await this.eventsService.create(event);
  }

  @Post('/:id/register')
  async registerAttendeeToEvent(
    @Param('id') id: string,
    @Body() attendee: EventAttendeeRegisterDto,
  ) {
    await this.eventsService.registerAttendeeToEvent(id, attendee);
  }
}
