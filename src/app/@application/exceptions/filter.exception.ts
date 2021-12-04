import { AppException } from './app.exception';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AppLogger } from '../logger/app.logger';
import { getNewLogger } from '../logger/logger';

@Catch()
export class FilterException implements ExceptionFilter {
  private readonly logger: AppLogger = getNewLogger('AllExceptionsFilter');

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    // const request = ctx.getRequest();
    console.log(' ⛔ Call From All Exception Handler ⛔', exception);

    let statusCode: number;
    let errorMessages: string[] = [exception.message];
    if (exception instanceof AppException) {
    } else if (exception instanceof TypeError) {
      this.logger.error(exception.message, exception.stack, exception.name);
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

      if (exception.message) {
        errorMessages = [exception.message];
      } else {
        errorMessages = ['Internal Server Error'];
      }
    } else if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const res: any = exception.getResponse();
      errorMessages =
        typeof res.message === 'string' ? [res.message] : res.message;
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessages = errorMessages ? errorMessages : ['Internal Server Error'];
    }

    this.logger.error(exception.message, exception);

    const res = {
      success: false,
      statusCode: statusCode,
      message:  Array.isArray(errorMessages) && errorMessages?.length ? errorMessages[0] : "something went wrong",
      errorMessages,
      // developerMessage: exception.message,
    };
    response.status(statusCode).json(res);
  }
}
