import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  async signUp(@Body() userDto: CreateUserDto) {
    return await this.usersService.create(userDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  signIn(@Request() req) {
    return req.user;
  }
}
