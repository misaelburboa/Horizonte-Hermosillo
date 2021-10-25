import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateEventDto } from './dto/create-event.dto';
import { EventAttendeeRegisterDto } from './dto/event-attendee-register.dto';
import { PaginationDto } from './dto/pagination.dto';
import { EventsService } from './events.service';

@ApiTags('Events')
@Controller('events')
@UseInterceptors(ClassSerializerInterceptor)
@UseFilters(HttpExceptionFilter)
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllEvents(@Query() params: PaginationDto) {
    return await this.eventsService.getAll(params);
  }

  @ApiParam({
    name: 'id',
    type: 'String',
    description: 'id of the event we want to grab',
    required: true,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getEvent(@Param('id') id: string) {
    return await this.eventsService.get(id);
  }

  @ApiParam({
    name: 'id',
    type: 'String',
    description: 'id of the event to activate',
    required: true,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('/:id/activate')
  async activateEvent(@Param('id') id: string) {
    return await this.eventsService.activateEvent(id);
  }

  @ApiParam({
    name: 'id',
    type: 'String',
    description: 'id of the event to deactivate',
    required: true,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('/:id/deactivate')
  async deactivate(@Param('id') id: string) {
    return await this.eventsService.deactivateEvent(id);
  }

  @ApiParam({
    name: 'id',
    type: 'String',
    description: 'id of the event to we want the attendees from',
    required: true,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/:id/attendees')
  async getEventAttendees(@Param('id') eventId: string) {
    const attendees = await this.eventsService.getEventAttendees(eventId);
    console.log(attendees);
    return attendees;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() event: CreateEventDto) {
    return await this.eventsService.create(event);
  }

  @ApiParam({
    name: 'id',
    type: 'String',
    description: 'id of the event to we want to register to',
    required: true,
  })
  @ApiBearerAuth()
  @Post('/:id/register')
  async registerAttendeeToEvent(
    @Param('id') id: string,
    @Body() attendee: EventAttendeeRegisterDto,
  ) {
    return await this.eventsService.registerAttendeeToEvent(id, attendee);
  }
}
