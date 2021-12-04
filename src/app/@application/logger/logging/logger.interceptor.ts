import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoggerService } from './logger.service';
import { Request } from 'express';
import { HttpService } from '@nestjs/axios';
import * as uuid from 'uuid4';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(
    private readonly logger: LoggerService,
    private readonly httpService: HttpService
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    const requestId = uuid();
    this.logger.setRequestId(requestId);
    if (requestId) {
      this.httpService.axiosRef.defaults.headers.common['x-request-id'] =
        requestId;
    }
    return next.handle();
  }
}
