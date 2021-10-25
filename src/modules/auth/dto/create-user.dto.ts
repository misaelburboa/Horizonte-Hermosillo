import {
  IsBoolean,
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class CreateUserDto {
  // TODO: store the values of validations in constants
  @IsString()
  @MinLength(4)
  @MaxLength(25)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too week',
  })
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
