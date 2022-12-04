import { Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type AdminDocument = mongoose.HydratedDocument<Admin>;

@Schema()
export class Admin {
    type: string;

    email: string;

    password: string;

    firstName: string;

    lastName: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);