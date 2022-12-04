import { Module } from '@nestjs/common';
import { ComplaintsController } from './complaints.controller';
import { ComplaintsService } from './complaints.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Complaint, ComplaintSchema } from './complaint.schema';
import { UsersModule } from 'src/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/guards/roles.guard';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: Complaint.name, schema: ComplaintSchema }])
  ],
  controllers: [ComplaintsController],
  providers: [
    ComplaintsService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class ComplaintsModule {}
