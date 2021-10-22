import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  name: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  date: Date;

  @IsNumber()
  singleSeatsNumber: number;

  @IsNumber()
  doubleSeatsNumber: number;
}
