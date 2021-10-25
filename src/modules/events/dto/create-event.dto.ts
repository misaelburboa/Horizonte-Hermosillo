import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  date: Date;

  @ApiProperty()
  @IsNumber()
  singleSeatsNumber: number;

  @ApiProperty()
  @IsNumber()
  doubleSeatsNumber: number;
}
