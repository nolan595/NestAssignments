import { Prisma } from "@prisma/client";

export class Users implements Prisma.UserCreateInput {
    id: number;
    name: string
    email: string;
    age: number;
}