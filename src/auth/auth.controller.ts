import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

// my imports
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register-dto';
import { LoginDto } from './dto/login-dto';
import { AuthGuard } from './guards/auth.guard';
import { RequestWithUser } from './interfaces/request-user';
import { Roles } from './decorators/role-decorator';
import { RolesGuard } from './guards/roles.guard';
import { Role } from './enums/role-enums';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('register')
    register(
        @Body() registerDto: RegisterDto,
    ) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    login(
        @Body() loginDto: LoginDto,
    ) {
        return this.authService.login(loginDto);
    }

    @Get('profile')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    profile(
        @Req() req: RequestWithUser
    ) {
        return req.user;
    }

}
