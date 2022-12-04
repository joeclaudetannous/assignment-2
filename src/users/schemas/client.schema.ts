import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';

export type ClientDocument = mongoose.HydratedDocument<Client>;

@Schema()
export class Client {
    type: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;

    @Prop({ default: false })
    isVIP: boolean;

    @Prop({
        type: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Complaint'
        }]
    })
    complaintsId: mongoose.Types.ObjectId[];
}

export const ClientSchema = SchemaFactory.createForClass(Client);