import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Type } from 'class-transformer';
import * as mongoose from 'mongoose';

export type ComplaintDocument = mongoose.HydratedDocument<Complaint>;

export enum Status {
    Pending = 'PENDING',
    Inprogress = 'INPROGRESS',
    Resolved = 'RESOLVED',
    Rejected = 'REJECTED'
}

@Schema({ timestamps: {createdAt: 'createdDate', updatedAt: 'updatedDate'} })
export class Complaint {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    body: string;

    @Prop({ default: Status.Pending, index: {name: 'index for status'} })
    status: string;

    @Prop({
         required: true, 
         index: {name: 'index for userId'},
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
     })
    userId: mongoose.Types.ObjectId;
}

export const ComplaintSchema = SchemaFactory.createForClass(Complaint);