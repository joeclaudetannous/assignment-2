import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ComplaintsModule } from './complaints/complaints.module';

@Module({
  imports: [
    UsersModule, 
    AuthModule,
    MongooseModule.forRoot('mongodb+srv://joeTannous:E0fHgnVc0AKtZQmu@cluster0.qgjoclt.mongodb.net/?retryWrites=true&w=majority'),
    ComplaintsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
