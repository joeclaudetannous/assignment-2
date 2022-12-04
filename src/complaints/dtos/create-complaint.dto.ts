import { IsString } from 'class-validator';

export class CreateComplaintDto {
    @IsString()
    title: string;
    @IsString()
    body: string;
}