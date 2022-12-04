import { Injectable } from '@nestjs/common';
// import {} from '@nestjs/password';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
