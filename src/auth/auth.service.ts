import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
// my imports
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register-dto';
import { LoginDto } from './dto/login-dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}
    
    async register({name, email, password}: RegisterDto) {

        const user = await this.usersService.findByEmail(email);

        if (user) {
            throw new BadRequestException('User already exists');
        }

        return await this.usersService.create({
            name,
            email,
            password: await bcrypt.hash(password, 10)
        });
    }

    async login({email, password}: LoginDto){
        
        // find user by email
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new BadRequestException('Invalid email');
        }

        // compare password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new BadRequestException('Invalid password');
        }

        // generate token
        const payload = { email: user.email, role: user.role};

        const token = this.jwtService.sign(payload);

        return { token };
    }

}
