import { IsEmail, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  phone: string;
}
