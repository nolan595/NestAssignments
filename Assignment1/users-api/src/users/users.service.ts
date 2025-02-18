import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/response-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const user = await this.prisma.user.create({ data });
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    } as UserResponseDto;
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id: Number(id) },
    });
  }

  update(id: number, data: UpdateUserDto): Promise<UpdateUserDto> {
    return this.prisma.user.update({
      where: { id: Number(id) },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: { id: Number(id) },
    });
  }
}
