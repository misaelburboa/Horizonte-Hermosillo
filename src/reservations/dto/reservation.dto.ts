import { IsString } from 'class-validator';

export class ReservationDto {
  @IsString()
  event: string;

  @IsString()
  name: string;

  @IsString()
  phone: string;
}
