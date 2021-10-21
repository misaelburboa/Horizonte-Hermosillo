import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { ReservationDto } from './dto/reservation.dto';

@Controller('reservations')
export class ReservationsController {
  @Post()
  @UseFilters(HttpExceptionFilter)
  create(@Body() body: ReservationDto) {
    return body;
  }
}
