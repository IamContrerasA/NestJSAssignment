import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `check documentation of API api/ -------------------
    repository: https://github.com/IamContrerasA/NestJSAssignment`;
  }
}
