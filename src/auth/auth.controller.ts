import { 
    Controller,
    UseGuards, Request, 
    Post, Get,
    Body
} from '@nestjs/common';
import { UserDto } from 'src/users/dtos/user.dto';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { RequestProperty } from './constants';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Serialize(UserDto)
    @Public()
    @Post('/signup')
    async signup(@Body() body: CreateUserDto) {
        return this.authService.signup(body);
    }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {
        // console.log('after calling login method the user :', req.user);
        return this.authService.login(req.user._doc);
    }

    @Get('profile')
    getProfile(@Request() req) {
      const user = req.user as RequestProperty;
      return user;
    }
}
