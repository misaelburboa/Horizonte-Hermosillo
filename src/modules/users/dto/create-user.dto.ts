import { IsBoolean, IsEmail, IsString, ValidateIf } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  @ValidateIf(
    ({ password }) =>
      password !== null && password !== undefined && password !== '',
  )
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsBoolean()
  @ValidateIf(
    ({ idAdmin }) =>
      idAdmin !== null && idAdmin !== undefined && idAdmin !== '',
  )
  isAdmin?: boolean;
}
