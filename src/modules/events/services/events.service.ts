import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain } from 'class-transformer';
import { Repository } from 'typeorm';
import { Attendee } from '../models/attendees.entity';
import { CreateEventDto } from '../dto/create-event.dto';
import {
  EventAttendeeRegisterDto,
  SeatType,
} from '../dto/event-attendee-register.dto';
import { Event } from '../models/event.entity';
import {
  ACTIVATE_DEACTIVATE_EVENT_NOT_FOUND,
  NOT_ACTIVE_EVENT_MESSAGE,
  NOT_FOUND_EXCEPTION_MESSAGE,
  NO_SEAT_AVAILABLE_MESSAGE,
  REGISTER_NOT_FOUND_MESSAGE,
} from '../constants';
import {
  NoSeatAvailableException,
  NotActiveEventException,
} from '../exceptions';
import { PaginationDto } from '../dto/pagination.dto';
import { CANCELLATION_CODE_NEEDED } from '../../../modules/auth/constants';
import { TwilioNotificationService } from '../../../modules/notifications/services/twilio-notification.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private eventsRepo: Repository<Event>,
    @InjectRepository(Attendee) private attendeesRepo: Repository<Attendee>,
    private twilioMessageService: TwilioNotificationService,
  ) {}

  async get(id: string) {
    return await this.eventsRepo.find({
      where: { id },
      relations: ['attendees'],
    });
  }

  async getEventAttendees(eventId) {
    return await this.eventsRepo
      .createQueryBuilder('event')
      .innerJoinAndSelect('event.attendees', 'attendee')
      .where('event.id = :eventId', { eventId })
      .andWhere('attendee.isCancel = :isCancel', { isCancel: false })
      .getMany();
  }

  // TODO: Create a pagination Service or something like that
  async getAll({ page, pageSize }: PaginationDto) {
    return await this.eventsRepo.find({
      relations: ['attendees'],
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
  }

  // TODO: Create a pagination Service or something like that
  async getActiveEvents({ page, pageSize }: PaginationDto) {
    return await this.eventsRepo.find({
      where: { isActive: true },
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
  }

  async create(eventDto: CreateEventDto) {
    const event = this.eventsRepo.create(classToPlain(eventDto));

    return await this.eventsRepo.save(event);
  }

  async activateEvent(id: string) {
    const event = await this.eventsRepo.findOne(id);
    if (!event) {
      throw new NotFoundException(ACTIVATE_DEACTIVATE_EVENT_NOT_FOUND);
    }

    event.isActive = true;
    return this.eventsRepo.save(event);
  }

  async deactivateEvent(id: string) {
    const event = await this.eventsRepo.findOne(id);
    if (!event) {
      throw new NotFoundException(ACTIVATE_DEACTIVATE_EVENT_NOT_FOUND);
    }

    event.isActive = false;
    return this.eventsRepo.save(event);
  }

  async registerAttendeeToEvent(
    eventId: string,
    attendeeDto: EventAttendeeRegisterDto,
  ) {
    const eventEntity = await this.getEventEntity(eventId);

    this.checkIfEventIsActive(eventEntity);
    this.checkSeatAvailability(attendeeDto.seatType, eventEntity);

    const attendee = this.attendeesRepo.create(classToPlain(attendeeDto));
    attendee.event = eventEntity;
    attendee.cancellationCode = this.generateCancellationCode();

    let attendeeSaved = null;
    try {
      attendeeSaved = await this.attendeesRepo.save(attendee);

      // INFO: This should be placed in the subscriber but NestJS is not supporting injections
      // on subscribers right now.
      this.twilioMessageService.sendWhatsAppNotification(
        'Test Message from SERVICE',
        attendee.phone1,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return attendeeSaved;
  }

  async cancelRegister(cancellationCode) {
    // TODO: Send emails, whatsapp or whatever
    // TODO: Check if apply some waiting, list if so, look for the one in the top of that queue and assign the space free
    if (!cancellationCode) {
      throw new BadRequestException(CANCELLATION_CODE_NEEDED);
    }
    const [register] = await this.attendeesRepo.find({
      where: {
        cancellationCode,
      },
      relations: ['event'],
    });

    if (!register) {
      throw new NotFoundException(REGISTER_NOT_FOUND_MESSAGE);
    }

    register.isCancel = true;
    return await this.attendeesRepo.save(register);
  }

  private checkIfEventIsActive(eventEntity: Event) {
    if (!eventEntity.isActive || eventEntity.isDeleted) {
      throw new NotActiveEventException(NOT_ACTIVE_EVENT_MESSAGE);
    }
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
      throw new NoSeatAvailableException(NO_SEAT_AVAILABLE_MESSAGE);
    }

    if (seatType === SeatType.DOUBLE && event.singleSeatsNumber <= 0) {
      throw new NoSeatAvailableException(NO_SEAT_AVAILABLE_MESSAGE);
    }
  }
}
