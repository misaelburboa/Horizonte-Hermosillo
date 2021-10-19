import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes, scrypt as _script } from 'crypto';
import { Repository } from 'typeorm';
import { promisify } from 'util';
import { USER_EXISTS } from './constants/exception-messages';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

const scrypt = promisify(_script);

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  // TODO: Check if the current user is admin to access this route
  async create(userDto: CreateUserDto) {
    console.log("entro");
    // TODO: Contemplate the other user creation scenarios, for now, we'll just consider
    // the username for the validation of the email
    const users = await this.usersRepository.find({ email: userDto.email });

    if (users.length) {
      throw new BadRequestException(USER_EXISTS);
    }

    const hashedPassword = this.hashPassword(userDto.password);

    const { username, email, name, phone, isAdmin = false } = userDto;

    const userObj = {
      username,
      email,
      name,
      phone,
      isAdmin,
      hashedPassword,
    };
    console.log(userObj);
    const user = this.usersRepository.create(userObj);
    this.usersRepository.save(user);
  }

  async hashPassword(plainPassword: string) {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(plainPassword, salt, 32)) as Buffer;
    const hashedPassword = `${salt}.${hash.toString('hex')}`;

    return hashedPassword;
  }
}
