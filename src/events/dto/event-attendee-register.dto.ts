import {
  IsAlpha,
  IsEnum,
  IsPhoneNumber,
  IsString,
  ValidateIf,
} from 'class-validator';

enum SeatType {
  SINGLE = 'single',
  DOUBLE = 'double',
}

const isDoubleSeatRequest = (seatType) => seatType === SeatType.DOUBLE;

export class EventAttendeeRegisterDto {
  @IsString()
  @IsAlpha()
  @ValidateIf(({ seatType }) => isDoubleSeatRequest(seatType))
  name: string;

  @IsString()
  @ValidateIf(({ seatType }) => isDoubleSeatRequest(seatType))
  secondName?: string;

  @IsString()
  @IsPhoneNumber()
  mainPhone: string;

  @IsString()
  @IsPhoneNumber()
  secondPhone?: string;

  @IsEnum(SeatType)
  seatType: SeatType;
}
