import { Attendee } from 'src/events/attendees.entity';
import { SeatType } from 'src/events/dto/event-attendee-register.dto';
import { Event } from 'src/events/event.entity';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
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

    console.log(`AFTER ENTITY INSERTED: `, event.entity);
  }
}
