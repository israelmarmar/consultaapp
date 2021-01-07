import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const HelloString = `Hello World!`;
    return HelloString;
  }
}
