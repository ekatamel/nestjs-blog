import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user-dto';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { AdminGuard } from '../guards/admin.guard';
import { User } from './user.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/users')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'All users',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('users/:userId')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({
    status: 200,
    description: 'User found by ID',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 404,
    description: "User doesn't exist",
  })
  getUserById(@Param('userId') userId: string) {
    return this.usersService.getUserById(userId);
  }

  @Get()
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Get user by email' })
  @ApiResponse({
    status: 200,
    description: 'User found by email',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 404,
    description: "User doesn't exist",
  })
  getUserByEmail(@Query('email') email: string) {
    return this.usersService.getUserByEmail(email);
  }

  @Post('/signup')
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Session() session: any,
  ): Promise<User> {
    const user = await this.authService.signUp(createUserDto);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signInUser(
    @Body() loginUserDto: LoginUserDto,
    @Session() session: any,
  ) {
    const user = await this.authService.signIn(loginUserDto);
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  @UseGuards(AuthGuard)
  signOutUser(@Session() session: any) {
    session.userId = null;
  }

  @Delete('users/:userId')
  @UseGuards(AdminGuard)
  deleteUser(@Param('userId') id: string) {
    return this.usersService.deleteUser(id);
  }
}
