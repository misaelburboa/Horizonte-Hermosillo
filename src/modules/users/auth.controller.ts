import { Body, Controller, Get, Post } from '@nestjs/common';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { CreateUserDto } from './dto/create-user.dto';

@Serialize(CreateUserDto)
@Controller('auth')
export class AuthController {
  @Get()
  index() {
    return 'This is the Users Module Index';
  }

  @Post('signup')
  signUp(@Body() body: CreateUserDto) {
    return body;
  }
}
