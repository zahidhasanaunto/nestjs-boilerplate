import { BaseError } from '../base/base.error';
import { AUTH_ERROR_CODE } from '../constants';

export class AuthError extends BaseError {
  constructor(message?: string, developerMessage?: string) {
    message = message || 'Authentication Error';
    super(AUTH_ERROR_CODE, message);
  }
}
