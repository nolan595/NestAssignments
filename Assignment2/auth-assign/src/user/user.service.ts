import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import {User} from '@prisma/client'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {} // calling db service
  
  create(data: User) {
    return this.prisma.user.create({data});
    
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(username: string) {
    const user = await this.prisma.user.findUnique({where: { username}});
    if (!user) {
      return null;
    }
    return user

  }
  update(id: number, data: User) {
    return this.prisma.user.update({where: {id}, data});
  }

  remove(id: number) {
    return this.prisma.user.delete({where: {id}});
  }
}
