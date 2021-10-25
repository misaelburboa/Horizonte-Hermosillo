import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { scrypt as _script } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';

const scrypt = promisify(_script);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(userDto: CreateUserDto) {
    return await this.usersService.create(userDto);
  }

  async signIn(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return { access_token: this.jwtService.sign(payload) };
  }

  async validateUser(username: string, password: string) {
    const user = await this.usersService.getUserByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Bad Credentials');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new UnauthorizedException('Bad Credentials');
    }

    delete user.password;

    return user;
  }
}
