import { Expose, Transform } from 'class-transformer';

export class UserDto {
    @Transform(({ obj }) => obj._id)
    @Expose()
    id: string;

    @Expose()
    email: string;

    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    type: string;

    @Expose()
    isVIP: boolean;

    @Expose()
    complaintsId: any[];
}