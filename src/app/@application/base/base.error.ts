import { ApiError } from '../errors/api.error';
import { AppErrorResponse } from '../types/errorResponse.type';
import { IBaseError } from './../interfaces/baseError.interface';

export class BaseError extends Error implements IBaseError {
  private errorResponse: AppErrorResponse;
  private httpErrorCode: number;

  constructor(appErrorCode: number, message: string) {
    super(message);
    this.errorResponse = new AppErrorResponse(
      this.message,
      appErrorCode,
      this.message
    );
    this.getResponseObject();
  }

  public getResponseObject(): AppErrorResponse {
    throw new ApiError(this.errorResponse);
  }

  public getResponseJSONString(): string {
    const str = JSON.stringify(this.getResponseObject());
    return str.replace(/\\\"/g, '');
  }

  public getHTTPErrorCode(): number {
    return this.httpErrorCode;
  }
}
