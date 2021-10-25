import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { scrypt as _script } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_script);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(userDto: CreateUserDto) {
    return await this.usersService.create(userDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto) {
    const user = await this.usersService.getUserByUsername(
      authCredentialsDto.username,
    );

    if (!user) {
      throw new UnauthorizedException('Bad Credentials');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(
      authCredentialsDto.password,
      salt,
      32,
    )) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new UnauthorizedException('Bad Credentials');
    }

    delete user.password;

    return user;
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
