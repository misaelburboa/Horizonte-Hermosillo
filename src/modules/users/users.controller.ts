import { Body, Controller, Post } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateUserResponseDto } from './dto/create-user-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @Serialize(CreateUserResponseDto)
  async create(@Body() userDto: CreateUserDto) {
    const user = await this.usersService.create(userDto);

    return user;
  }
}