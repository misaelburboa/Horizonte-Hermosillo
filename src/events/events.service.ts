import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain } from 'class-transformer';
import { Repository } from 'typeorm';
import { Attendee } from './attendees.entity';
import { CreateEventDto } from './dto/create-event.dto';
import {
  EventAttendeeRegisterDto,
  SeatType,
} from './dto/event-attendee-register.dto';
import { Event } from './event.entity';
import { NOT_FOUND_EXCEPTION_MESSAGE, NO_SEAT_AVAILABLE } from './constants';
import { NoSeatAvailableException } from './exceptions';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private eventsRepo: Repository<Event>,
    @InjectRepository(Attendee) private attendeesRepo: Repository<Attendee>,
  ) {}

  // TODO: add pagination
  async get(id: string) {
    return await this.eventsRepo.find({
      where: { id },
      relations: ['attendees'],
    });
  }

  async getAll() {
    // TODO: Add pagination
    return await this.eventsRepo.find({
      relations: ['attendees'],
    });
  }

  create(eventDto: CreateEventDto) {
    const event = this.eventsRepo.create(classToPlain(eventDto));

    this.eventsRepo.save(event);
  }

  async registerAttendeeToEvent(
    eventId: string,
    attendeeDto: EventAttendeeRegisterDto,
  ) {
    const eventEntity = await this.getEventEntity(eventId);

    this.checkSeatAvailability(attendeeDto.seatType, eventEntity);

    const attendee = this.attendeesRepo.create(classToPlain(attendeeDto));
    attendee.event = eventEntity;
    attendee.cancellationCode = this.generateCancellationCode();

    return await this.attendeesRepo.save(attendee);
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

  private async getEventEntity(eventId: string) {
    const event = await this.eventsRepo.findOne({ id: eventId });

    if (!event) {
      throw new NotFoundException(NOT_FOUND_EXCEPTION_MESSAGE);
    }

    return event;
  }

  private checkSeatAvailability(seatType: SeatType, event: Event) {
    if (seatType === SeatType.SINGLE && event.singleSeatsNumber <= 0) {
      throw new NoSeatAvailableException(NO_SEAT_AVAILABLE);
    }

    if (seatType === SeatType.DOUBLE && event.singleSeatsNumber <= 0) {
      throw new NoSeatAvailableException(NO_SEAT_AVAILABLE);
    }
  }
}
