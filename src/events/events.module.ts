import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { Attendee } from './atendees.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Attendee])],
  providers: [EventsService],
  controllers: [EventsController],
})
export class EventsModule {}
