import { Body, Controller, Post } from '@nestjs/common';
import { ReservationDto } from './dto/reservation.dto';

@Controller('reservations')
export class ReservationsController {
  @Post()
  create(@Body() body: ReservationDto) {
    return body;
  }
}
