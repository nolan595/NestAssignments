import { Body, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/signin.dto';
import { User } from '@prisma/client';
import { SignUpDto } from './dto/signUp.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async validateUser({ username, password, role }: SignInDto) {
    const user = await this.userService.findOne(username);
    if (!user) return null;

    if (password === user.password) {
      const { password: _, ...result } = user;

      return this.jwtService.sign(result);
    }
  }

  async register(@Body() userNew: SignUpDto) {
    const username = userNew.username;
    const hashedPass = await bcrypt.hash(userNew.password, 10);
    return this.userService.create({
      username: username,
      password: hashedPass,
    });
  }
}
