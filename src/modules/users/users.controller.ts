import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserResponseDto } from './dto/create-user-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @Serialize(CreateUserResponseDto)
  async create(@Body() userDto: CreateUserDto) {
    const user = await this.usersService.create(userDto);

    return user;
  }
}
