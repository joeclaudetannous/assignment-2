import { Injectable, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { Client, ClientDocument } from './schemas/client.schema';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { User, UserDocument } from './schemas/user.schema';

const scrypt = promisify(_scrypt);

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private usersModel: Model<UserDocument>,
        @InjectModel(Client.name) private clientsModel: Model<ClientDocument>,
        @InjectModel(Admin.name) private adminsModel: Model<AdminDocument>
    ) {}

    async create(body: CreateUserDto) {
        if(body.isVIP && body.isAdmin) {
            throw new BadRequestException('a user cannot be admin and client in the same time');
        }
        const storedUser = await this.usersModel.findOne({email: body.email});
        if(storedUser) {
            throw new BadRequestException('email already exists, try another one');
        }

        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(body.password, salt, 32)) as Buffer;
        const hashedPass = salt + '.' + hash.toString('hex');

        if(body.isAdmin) {
            const admin = new this.adminsModel({
                type: 'Admin',
                email: body.email,
                password: hashedPass,
                firstName: body.firstName,
                lastName: body.lastName
            });

            const result = await admin.save();
            return result
        }

        const client = new this.clientsModel({
            type: 'Client',
            email: body.email,
            password: hashedPass,
            firstName: body.firstName,
            lastName: body.lastName,
            isVIP: body.isVIP
        });
        const result = await client.save();
        return result;
    }

    async findOne(email: string) {
        const user = await this.usersModel.findOne({email});
        return user;
    }

    async findClientOne(email: string) {
        const client = await this.clientsModel.findOne({email});
        return client;
    }
}
