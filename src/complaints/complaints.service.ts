import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Complaint, ComplaintDocument } from './complaint.schema';
import { CreateComplaintDto } from './dtos/create-complaint.dto';
import { UsersService } from 'src/users/users.service';
import * as mongoose from 'mongoose';
import { RequestProperty } from 'src/auth/constants';

@Injectable()
export class ComplaintsService {
    constructor(
        @InjectModel(Complaint.name) private complaintModel: Model<ComplaintDocument>, 
        private usersService: UsersService
    ) {}

    async create(body: CreateComplaintDto, user: RequestProperty) {
        const complaint = new this.complaintModel(body);
        complaint.userId = new mongoose.Types.ObjectId(user.userId);
        const complaintDoc = await complaint.save();

        const userDoc = await this.usersService.findClientOne(user.email);
        userDoc.complaintsId.push(complaintDoc._id);
        await userDoc.save();
        return complaintDoc;
    }

    async findComplaints(user: RequestProperty) {
        const userId = new mongoose.Types.ObjectId(user.userId);
        const complaints = await this.complaintModel.aggregate([
            {$match: {userId}},
            {$project: {title: 1, body: 1, status: 1, createdDate: 1}}
        ]);
        const result = {
            email: user.email,
            complaints
        }
        return result;
    }

    async findComplaintById(id: string) {
        const complaint = await this.complaintModel.findById(id);
        if(!complaint) {
            throw new NotFoundException('complaint not found');
        }
        return complaint;
    }

    async findComplaintsByStatus(status: string) {
        let result = {};
        
        if(status) {
            const vip = await this.complaintModel.aggregate([
                {$lookup: {from: 'users', localField: 'userId', foreignField: '_id', as: 'user'}},
                {$unwind: '$user'},
                {$match: {status, 'user.isVIP': true}},
                {$sort: {createdAt: -1}},
                {$project: {
                    // id: '$_id', 
                    title: 1, 
                    body: 1, 
                    createdDate: 1, 
                    status: 1, 
                    user: {
                        firstName: 1,
                        lastName: 1,
                        email: 1
                    }
                }}
            ]);
        
            const nonVip = await this.complaintModel.aggregate([
                {$lookup: {from: 'users', localField: 'userId', foreignField: '_id', as: 'user'}},
                {$unwind: '$user'},
                {$match: {status, 'user.isVIP': false}},
                {$sort: {createdAt: -1}},
                {$project: {
                    // id: '$_id', 
                    title: 1, 
                    body: 1, 
                    createdDate: 1, 
                    status: 1, 
                    user: {
                        firstName: 1,
                        lastName: 1,
                        email: 1
                    }
                }}
            ]);
            result = {vip, nonVip};
            return result;
        }

        const vip = await this.complaintModel.aggregate([
            {$lookup: {from: 'users', localField: 'userId', foreignField: '_id', as: 'user'}},
            {$unwind: '$user'},
            {$match: {'user.isVIP': true}},
            {$sort: {createdAt: -1}},
            {$project: {
                // id: '$_id', 
                title: 1, 
                body: 1, 
                createdDate: 1, 
                status: 1, 
                user: {
                    firstName: 1,
                    lastName: 1,
                    email: 1
                }
            }}
        ]);
        const nonVip = await this.complaintModel.aggregate([
            {$lookup: {from: 'users', localField: 'userId', foreignField: '_id', as: 'user'}},
            {$unwind: '$user'},
            {$match: {'user.isVIP': false}},
            {$sort: {createdAt: -1}},
            {$project: {
                // id: '$_id', 
                title: 1, 
                body: 1, 
                createdDate: 1, 
                status: 1, 
                user: {
                    firstName: 1,
                    lastName: 1,
                    email: 1
                }
            }}
        ]);

        result = {vip, nonVip};
        return result;
    }

    async updateComplaintStatusById(id: string, status: string) {
        const complaint = await this.complaintModel.findById(id);
        if(!complaint) {
            throw new NotFoundException('complaint not found');
        }
        
        complaint.status = status;
        const result = await complaint.save();
        return result;
    }
}