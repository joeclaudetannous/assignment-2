import { Expose, Transform } from 'class-transformer';
// import { User } from 'src/users/user.schema';

export class ComplaintDto {
    @Transform(({ obj }) => obj._id)
    @Expose()
    id: string;

    @Expose()
    title: string;

    @Expose()
    body: string;

    @Expose()
    status: string;

    @Expose()
    createdDate: Date;

    @Expose()
    @Transform(({ obj }) => obj.userId.toString())
    userId: string;
}