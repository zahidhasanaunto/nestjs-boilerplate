import { BaseError } from '../base/base.error';
import { MALFORMED_REQUEST_ERROR_CODE } from '../constants';

export class MalformedRequestError extends BaseError {
  constructor(message?: string, developerMessage?: string) {
    message = message || 'Malformed request.';
    super(MALFORMED_REQUEST_ERROR_CODE, message);
  }
}
