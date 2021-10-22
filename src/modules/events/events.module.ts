import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { Attendee } from './attendees.entity';
import { RegisterController } from './register.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Attendee])],
  providers: [EventsService],
  controllers: [EventsController, RegisterController],
})
export class EventsModule {}