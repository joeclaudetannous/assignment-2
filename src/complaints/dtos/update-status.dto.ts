import { IsEnum } from 'class-validator';
import { Status } from '../complaint.schema';

export class UpdateStatusDto {
    @IsEnum(Status)
    status: string;
}