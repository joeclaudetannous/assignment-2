import { IsString, IsOptional, IsBoolean, IsEmail } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsOptional()
    @IsBoolean()
    isAdmin: boolean;

    @IsOptional()
    @IsBoolean()
    isVIP: boolean;
}