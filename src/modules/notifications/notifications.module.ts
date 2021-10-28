import { Module } from '@nestjs/common';
import { TwilioNotificationService } from './services/twilio-notification.service';

@Module({
  exports: [TwilioNotificationService],
  providers: [TwilioNotificationService],
})
export class NotificationsModule {}
