import { Module } from '@nestjs/common';
import { EventsService } from './services/events.service';
import { EventsController } from './controllers/events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './models/event.entity';
import { Attendee } from './models/attendees.entity';
import { RegisterController } from './controllers/register.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Attendee])],
  providers: [EventsService],
  controllers: [EventsController, RegisterController],
})
export class EventsModule {}
