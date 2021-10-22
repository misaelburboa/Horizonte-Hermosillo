import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AttendeeRegistrationSubscriber } from '../subscribers/AttendeeRegistrationSubscriber';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { Event } from './events/event.entity';
import { User } from './users/user.entity';
import { Attendee } from './events/attendees.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'horizontehermosillo.sqlite',
      entities: [Event, User, Attendee],
      subscribers: [AttendeeRegistrationSubscriber],
      synchronize: true,
    }),
    UsersModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}