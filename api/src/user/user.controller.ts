import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserPasswordGuard } from './user.password.guard';
import { UserService } from './user.service';
import { CreateUserInput, UpdateUserInput } from './user.types';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id/find')
  async findUserById(@Param('id') userId: string): Promise<User> {
    return this.userService.findUserById(userId);
  }

  @Get('email')
  async findUserByEmail(@Query('email') userEmail: string): Promise<User> {
    return this.userService.findUserByEmail(userEmail);
  }

  @Post('create')
  @UseGuards(UserPasswordGuard)
  async createUser(@Body('user') user: CreateUserInput): Promise<User> {
    return this.userService.createUser(user);
  }

  @Put('update/:id')
  async updateUser(
    @Param('id') userId: string,
    @Body('user') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.userService.updateUser(userId, updateUserInput);
  }
}
