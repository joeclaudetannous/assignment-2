import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Admin } from './admin.schema';
import { Client } from './client.schema';

export type UserDocument = mongoose.HydratedDocument<User>;

@Schema({ discriminatorKey: 'type' })
export class User {
    @Prop({
        required: true, 
        enum: [Client.name, Admin.name]
    })
    type: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({email: 1}, {name: 'index for email'});