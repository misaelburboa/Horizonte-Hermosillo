import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../../users/services/users.service';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async signUp(@Body() userDto: CreateUserDto) {
    return await this.usersService.create(userDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  signIn(@Request() req) {
    return this.authService.signIn(req.user);
  }
}
