import { IGetAllFromDBResponse } from './../interfaces/index';
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppSuccessResponse } from '../types/successResponse.type';

@Injectable()
export class FilterResponseInterceptor implements NestInterceptor {
  constructor() {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((content: any) => {
        if (content instanceof Error) {
          throw content;
        } else if (content?.data && content?.total) {
          return new AppSuccessResponse(
            'successful response',
            content.data,
            content.total,
            content.take,
            content.page || 1,
            content.skip || 0
          );
        } else if (content?.data && content?.data?.length === 0) {
          return new AppSuccessResponse(
            'successful response',
            content.data,
            content.total,
            content.take,
            content.page || 1,
            content.skip || 0
          );
        } else if (Array.isArray(content)) {
          return new AppSuccessResponse('successful response', content);
        } else if (typeof content === 'object') {
          return new AppSuccessResponse('ODE- response', content);
        } else if (typeof content === 'undefined') {
          return new AppSuccessResponse('successful response', null);
        } else {
          throw new HttpException('Unknown error', HttpStatus.BAD_REQUEST);
        }
      })
    );
  }
}
