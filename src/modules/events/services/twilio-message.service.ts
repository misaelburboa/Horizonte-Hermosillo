import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

// TODO: implement some creator pattern for this
class TwilioWhatsAppNotification {
  body: string;
  from: string;
  to: string;
  constructor(body: string, to: string) {
    this.body = body;
    this.from = `whatsapp:${process.env.TWILIO_WHATSAPP_FROM_NUMBER}`;
    this.to = `whatsapp:${to}`;
  }
}

@Injectable()
export class TwilioMessageService {
  private client;

  constructor(private configService: ConfigService) {
    this.client = new Twilio(
      configService.get<string>('TWILIO_ACCOUNT_SID'),
      configService.get<string>('TWILIO_AUTH_TOKEN'),
    );
  }

  async sendWhatsAppNotification(body: string, to: string) {
    try {
      const whatsAppNotification = new TwilioWhatsAppNotification(body, to);
      // TODO: implement a logger for knowing which notifications were sent
      const messageSid = await this.client.messages.create(
        whatsAppNotification,
      );
      return messageSid;
    } catch (error) {
      // TODO: Handle the case when notification was not sent
      // TODO: Implement the correct exception for this
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
