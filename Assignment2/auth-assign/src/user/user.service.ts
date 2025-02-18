import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/response-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {} // calling db service

  async create(data: CreateUserDto) {
    const user = await this.prisma.user.create({ data });
    return {
      id: user.id,
      username: user.username,
    } as UserResponseDto;
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(username: string) {
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!user) {
      return null;
    }
    return user;
  }
  update(id: number, data: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
