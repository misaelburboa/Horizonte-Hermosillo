import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservationsModule } from './reservations/reservations.module';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { Event } from './events/event.entity';
import { User } from './users/user.entity';
import { Attendee } from './events/attendees.entity';
import { AttendeeRegistrationSubscriber } from './subscribers/AttendeeRegistrationSubscriber';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'horizontehermosillo.sqlite',
      entities: [Event, User, Attendee],
      subscribers: [AttendeeRegistrationSubscriber],
      synchronize: true,
    }),
    ReservationsModule,
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
