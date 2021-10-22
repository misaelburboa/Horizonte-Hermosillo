import { Attendee } from 'src/modules/events/attendees.entity';
import { SeatType } from 'src/modules/events/dto/event-attendee-register.dto';
import { Event } from 'src/modules/events/event.entity';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

@EventSubscriber()
export class AttendeeRegistrationSubscriber
  implements EntitySubscriberInterface<Attendee>
{
  listenTo() {
    return Attendee;
  }

  async afterInsert(event: InsertEvent<Attendee>) {
    const eventsRepository = event.manager.getRepository(Event);
    const attendeeEntity = event.entity;

    const eventId = attendeeEntity.event.id;
    const eventEntity = await eventsRepository.findOne(eventId);

    if (attendeeEntity.seatType === SeatType.DOUBLE) {
      eventEntity.doubleSeatsNumber = eventEntity.doubleSeatsNumber - 1;
    }

    if (attendeeEntity.seatType === SeatType.SINGLE) {
      eventEntity.singleSeatsNumber = eventEntity.singleSeatsNumber - 1;
    }

    eventsRepository.save(eventEntity);
  }

  async afterUpdate(event: UpdateEvent<Attendee>) {
    const eventsRepository = event.manager.getRepository(Event);
    const { entity: attendeeEntity, databaseEntity: attendeeDbEntity } = event;

    // INFO: If the Attendee has change to inactive (cancelled) and what is in database
    // is not the same thing, it means the register was cancelled so we increase the amount
    // of seats available by one
    // basically: if change to cancelled and in database is not cancelled, go for it, increase seats number
    if (
      !attendeeEntity.isActive &&
      attendeeEntity.isActive !== attendeeDbEntity.isActive
    ) {
      const eventId = attendeeEntity.event.id;
      const eventEntity = await eventsRepository.findOne(eventId);

      if (attendeeEntity.seatType === SeatType.DOUBLE) {
        eventEntity.doubleSeatsNumber = eventEntity.doubleSeatsNumber + 1;
      }

      if (attendeeEntity.seatType === SeatType.SINGLE) {
        eventEntity.singleSeatsNumber = eventEntity.singleSeatsNumber + 1;
      }

      eventsRepository.save(eventEntity);
    }
  }
}
