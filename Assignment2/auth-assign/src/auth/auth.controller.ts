import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Request } from 'express';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { SignUpDto } from './dto/signUp.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: SignInDto })
  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Req() req: Request) {
    return req.user;
  }

  @Post('register')
  async register(@Body() userNew: SignUpDto) {
    return this.authService.register(userNew);
  }

  @ApiBearerAuth()
  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request) {
    return req.user;
  }
}
