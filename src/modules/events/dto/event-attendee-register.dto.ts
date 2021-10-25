import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlpha,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateIf,
} from 'class-validator';

export enum SeatType {
  SINGLE = 'single',
  DOUBLE = 'double',
}

const isDoubleSeatRequest = (seatType) => seatType === SeatType.DOUBLE;

export class EventAttendeeRegisterDto {
  @ApiProperty()
  @IsString()
  @IsAlpha()
  @ValidateIf(({ seatType }) => isDoubleSeatRequest(seatType))
  attendeeFullName: string;

  @ApiProperty()
  @IsString()
  @ValidateIf(({ seatType }) => isDoubleSeatRequest(seatType))
  secondAttendeeFullName?: string;

  @ApiProperty()
  @IsString()
  @IsPhoneNumber()
  phone1: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsPhoneNumber()
  phone2?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  seatNumber?: string;

  @ApiProperty()
  @IsEnum(SeatType)
  seatType: SeatType;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cancellationCode: string;
}
