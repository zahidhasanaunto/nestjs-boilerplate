import { BaseError } from '../base/base.error';
import { UNAUTHORIZED_ERROR_CODE } from './../constants/errorCodes.constants';

export class UnauthorizedRequestError extends BaseError {
  constructor(message?: string, developerMessage?: string) {
    message = message || 'Unauthorized request';
    super(UNAUTHORIZED_ERROR_CODE, message);
  }
}
