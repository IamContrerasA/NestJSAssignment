import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UsersService } from './users/users.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users/entities/user.entity';
import { UserRole } from './users/enum/user-enum';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private readonly usersService: UsersService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    return { user, sucess: true, message: 'User created, please login' };
  }

  @UseGuards(JwtAuthGuard)
  @Post('signout')
  async signout(@Request() req) {
    const user = await this.userRepository.findOne(req.user.id);
    await this.userRepository.save({ ...user, logged: false });

    return { message: 'logged out' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.userRepository.findOne(req.user.id);

    if (!user.logged)
      throw new HttpException('Please signin first', HttpStatus.FORBIDDEN);
    if (user.role === UserRole.CLIENT)
      throw new HttpException(
        `You don't have permission, you are client`,
        HttpStatus.FORBIDDEN,
      );

    return req.user;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
