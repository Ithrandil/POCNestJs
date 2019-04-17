import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/model/user.model';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}
    @Post('login')
    async login(@Body() user: User): Promise<any> {
     return this.authService.signIn(user);
    }
}
