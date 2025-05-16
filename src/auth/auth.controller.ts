import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Response } from 'express';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post("/login")
    async login(@Body() loginDto: any, @Res({ passthrough: true }) res: Response) {
        const { accesToken } = await this.authService.login(loginDto);

        res.cookie('access_token', accesToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 9 * 60 * 60 * 1000,
            sameSite: 'strict',
        });

        return { message: 'Login successful' };
    }

    @Post('/logout')
    @HttpCode(200)
    logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('access_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
        return { desc: 'Logout successful' };
    }
}
