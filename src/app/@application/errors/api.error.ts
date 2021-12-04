import { HttpException } from '@nestjs/common';
import { BAD_REQUEST_ERROR_CODE } from '../constants';
import { AppErrorResponse } from '../types/errorResponse.type';

export class ApiError extends HttpException {
  constructor(data: AppErrorResponse) {
    super(data, BAD_REQUEST_ERROR_CODE);
  }
}
