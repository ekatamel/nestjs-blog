import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../users/users.service';
import { AuthService } from '../users/auth.service';
import { User } from '../users/user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService;
  let fakeAuthService;

  beforeEach(async () => {
    fakeUsersService = {
      getUserById: (id: string) => {
        return Promise.resolve({
          id,
          email: 'asdf@asdf.com',
          password: 'asdf',
        } as User);
      },
      getUserByEmail: (email: string) => {
        return Promise.resolve([
          {
            id: '1',
            email,
            password: 'asdf',
            firstName: 'test',
          },
        ]);
      },
    };
    fakeAuthService = {
      signIn: ({ email, password }) => {
        return Promise.resolve({
          id: 1,
          email,
          password,
        });
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findUser returns a single user with the given id', async () => {
    const user = await controller.getUserById('1');
    expect(user).toBeDefined();
  });

  it('signin updates session object and returns user', async () => {
    const session = { userId: -10 };
    const user = await controller.signInUser(
      { email: 'asdf@asdf.com', password: 'asdf' },
      session,
    );

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
