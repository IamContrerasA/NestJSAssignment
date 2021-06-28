import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { UserRole } from 'src/users/enum/user-enum';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneWithEmail(email);
    const isMatch = await bcrypt.compare(pass, user.password);

    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      logged: user.logged,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async protectedRoutesClient(bearerUser: User) {
    const user = await this.usersService.findOne(`${bearerUser.id}`);

    if (!user.logged)
      throw new HttpException('Please signin first', HttpStatus.FORBIDDEN);
    if (user.role === UserRole.CLIENT)
      throw new HttpException(
        `You don't have permission, you are client`,
        HttpStatus.FORBIDDEN,
      );
  }

  async protectedRoutes(bearerUser: User) {
    const user = await this.usersService.findOne(`${bearerUser.id}`);

    if (!user.logged)
      throw new HttpException('Please signin first', HttpStatus.FORBIDDEN);
  }
}
