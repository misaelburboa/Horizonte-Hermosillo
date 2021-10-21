import { Expose } from 'class-transformer';

export class CreateUserResponseDto {
  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  phone: string;

  @Expose()
  isAdmin: boolean;
}
