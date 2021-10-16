import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Controller('auth')
export class UsersController {
  @Get()
  index() {
    return 'This is the Users Module Index';
  }

  @Post('signup')
  signUp(@Body() body: UserDto) {
    console.log(body);
    return body;
  }
}
