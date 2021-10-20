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
  @IsString()
  @IsAlpha()
  @ValidateIf(({ seatType }) => isDoubleSeatRequest(seatType))
  attendeeFullName: string;

  @IsString()
  @ValidateIf(({ seatType }) => isDoubleSeatRequest(seatType))
  secondAttendeeFullName?: string;

  @IsString()
  @IsPhoneNumber()
  phone1: string;

  @IsOptional()
  @IsString()
  @IsPhoneNumber()
  phone2?: string;

  @IsString()
  @IsOptional()
  seatNumber?: string;

  @IsEnum(SeatType)
  seatType: SeatType;

  @IsString()
  cancellationCode: string;
}
