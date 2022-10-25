import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { BadRequestException } from '@nestjs/common';
import { User } from '../users/user.entity';

describe('Auth service', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];
    const fakeUsersService = {
      getUserByEmail: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      createUser: ({ email, password }) => {
        const user = {
          id: Math.floor(Math.random() * 99999).toString(),
          password,
          email,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signUp({
      email: 'test@test.com',
      password: 'asdfghjkl',
    });

    expect(user.password).not.toEqual('asdfghjkl');
    const [salt, hashDB] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hashDB).toBeDefined();
  });
});
