import { Module } from '@nestjs/common';
import { EventsService } from './services/events.service';
import { EventsController } from './controllers/events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './models/event.entity';
import { Attendee } from './models/attendees.entity';
import { RegisterController } from './controllers/register.controller';
import { TwilioNotificationService } from '../notifications/services/twilio-notification.service';
import { ConfigService } from '@nestjs/config';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Attendee]), NotificationsModule],
  providers: [ConfigService, EventsService, TwilioNotificationService],
  controllers: [EventsController, RegisterController],
})
export class EventsModule {}
