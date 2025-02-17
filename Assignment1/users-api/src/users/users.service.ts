import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {Users} from './users.model';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(data: Users): Promise<Users> {
    return this.prisma.user.create({
     data,
    });
    
  }

  findAll(): Promise<Users[]> {
    return this.prisma.user.findMany();
  }

  findOne(id: number): Promise<Users | null> {
return this.prisma.user.findUnique({
    where: {id:Number(id) }
})  }

  update(id: number, data: Users): Promise<Users> {
return this.prisma.user.update({
  where: {id:Number(id)},
  data: {name: data.name, email: data.email, age: data.age}
})  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: {id:Number(id)}
    })
  }
}
