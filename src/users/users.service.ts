import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    const users = await this.usersRepository.find();

    return users;
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User with this ID was not found');
    }

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });

    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const user = this.usersRepository.create({
      email,
      password,
    });

    await this.usersRepository.save(user);
    return user;
  }

  async deleteUser(id: string) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User with this id was not found');
    }

    await this.usersRepository.remove(user);
  }
}
