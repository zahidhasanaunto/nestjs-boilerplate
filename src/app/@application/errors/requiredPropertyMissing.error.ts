import { BaseError } from '../base/base.error';
import { QUERY_ERROR_CODE } from '../constants';

export class QueryError extends BaseError {
  constructor(message?: string, developerMessage?: string) {
    message = message || 'Query Error';
    super(QUERY_ERROR_CODE, message);
  }
}
