import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService, 
        private jwtService: JwtService
    ) {}

    async signup(body: CreateUserDto) {
        return this.usersService.create(body);
    }

    async validateUser(email: string, password: string) {
        const user = await this.usersService.findOne(email);
        if(!user) {
            throw new NotFoundException('user not found');
        }

        const salt = user.password.split('.')[0];
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        const hashedPass = salt + '.' + hash.toString('hex');

        if(user.password.toString() === hashedPass ) {
            const { password, ...results } = user;
            // console.log('after retrieving user data from database excluding the password: ', results);
            return results;
        }

        return null;
    }

    async login(user: any) {
        const payload = {email: user.email, sub: user._id, roles: user.type};
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
