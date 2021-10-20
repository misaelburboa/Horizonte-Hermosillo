import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain } from 'class-transformer';
import { Repository } from 'typeorm';
import { Attendee } from './attendees.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { EventAttendeeRegisterDto } from './dto/event-attendee-register.dto';
import { Event } from './event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private eventsRepo: Repository<Event>,
    @InjectRepository(Attendee) private attendeesRepo: Repository<Attendee>,
  ) {}

  create(eventDto: CreateEventDto) {
    const event = this.eventsRepo.create(classToPlain(eventDto));

    this.eventsRepo.save(event);
  }

  async registerAttendeeToEvent(
    eventId: string,
    attendeeDto: EventAttendeeRegisterDto,
  ) {
    const event = await this.eventsRepo.findOne({ id: eventId });

    if (!event) {
      // TODO: Not to hardcode messages.
      throw new NotFoundException('Event Not Found');
    }

    const attendee = this.attendeesRepo.create(classToPlain(attendeeDto));
    attendee.event = event;
    attendee.cancellationCode = this.generateCancellationCode();
    // TODO: Login for generating the seat type/number
    attendee.seatNumber = '1';
    await this.attendeesRepo.save(attendee);
  }
  private generateCancellationCode() {
    const NUM_OF_CHARS = 8;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    let cancellationCode = '';
    const charactersLength = characters.length;
    for (let i = 0; i < NUM_OF_CHARS; i++) {
      cancellationCode += characters.charAt(
        Math.floor(Math.random() * charactersLength),
      );
    }

    return cancellationCode.toUpperCase();
  }
}
