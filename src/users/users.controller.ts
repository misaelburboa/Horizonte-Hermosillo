import { Body, Controller, Get, Post } from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  @Get()
  index() {
    return 'This is the Users Module Index';
  }

  @Post('signup')
  signUp(@Body() body: UserDto) {
    return body;
  }
}
