import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Response } from 'express';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    // @Post("/login")
    // async login(@Body() loginDto: any, @Res({ passthrough: true }) res: Response) {
    //     const { accesToken, userTokenData } = await this.authService.login(loginDto);
    //     return { message: 'Login successful', accesToken, userTokenData  };
    // }

    @Post("/login")
    async login(@Body() loginDto: any) {
        return await this.authService.login(loginDto);
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
