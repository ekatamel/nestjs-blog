import {
  BadRequestException,
  Body,
  Injectable,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { LoginUserDto } from './dto/login-user-dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    // const user = await this.usersService.getUserByEmail(email);

    // if (user) {
    //   throw new BadRequestException('Email has already been taken');
    // }

    // Generate a salt
    const salt = randomBytes(8).toString('hex');

    // Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // Join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');

    // Create a new user and save it

    return await this.usersService.createUser({
      email,
      password: result,
    });
  }

  async signIn(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.usersService.getUserByEmail(email);

    // if (!user) {
    //   throw new NotFoundException("User with this email doesn't exist");
    // }

    const [salt, hashDB] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (hashDB === hash.toString('hex')) {
      return user;
    } else {
      throw new BadRequestException('Password is wrong!');
    }
  }
}
