import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './schemas/admin.schema';
import { Client, ClientSchema } from './schemas/client.schema';
import { User, UserSchema } from './schemas/user.schema';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: User.name, 
      schema: UserSchema, 
      discriminators: [
        {name: Admin.name, schema: AdminSchema},
        {name: Client.name, schema: ClientSchema}
      ]
    }])
  ],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
