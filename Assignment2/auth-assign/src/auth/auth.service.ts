import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/signin.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService,
        private userService: UserService
    ) {}

    async validateUser({username, password, role}: SignInDto)  {
        const user = await this.userService.findOne(username);  
        if (!user) return null;


        if (password === user.password) {

            const {password: _, ...result} = user;
            
            return this.jwtService.sign(result);
        }

        
    }

    async register(userNew: User) {
        return this.userService.create(userNew);
    }

}
