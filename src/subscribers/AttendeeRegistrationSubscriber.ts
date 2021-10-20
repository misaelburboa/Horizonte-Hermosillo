import { Attendee } from 'src/events/attendees.entity';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';

@EventSubscriber()
export class AttendeeRegistrationSubscriber
  implements EntitySubscriberInterface
{
  async afterInsert(event: InsertEvent<Attendee>) {
    const eventsRepository = event.manager.getRepository(Event);
    const eventData = await eventsRepository.findOne(1);
    console.log(eventData);

    console.log(`AFTER ENTITY INSERTED: `, event.entity);
  }
}
