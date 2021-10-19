import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './event.entity';

@Injectable()
export class EventsService {
  constructor(@InjectRepository(Event) private eventsRepo: Repository<Event>) {}

  create(eventDto: CreateEventDto) {
    const event = this.eventsRepo.create({
      name: eventDto.name,
      date: eventDto.date,
    });

    this.eventsRepo.save(event);
  }
}
