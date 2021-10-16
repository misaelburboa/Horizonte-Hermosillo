import { Transform } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  name: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  date: Date;
}
