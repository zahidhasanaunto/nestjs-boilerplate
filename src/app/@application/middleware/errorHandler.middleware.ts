import { MalformedRequestError } from '../errors';

export function ErrorHandlerMiddleware(req: any, res: any, next: Function) {
  try {
    next();
  } catch (error) {
    throw new MalformedRequestError('Server Error. Dont Panic');
  }
}
