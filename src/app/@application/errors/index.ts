export * from './malformedRequest.error';
export * from './requiredPropertyMissing.error';
export * from './api.error';
export * from './auth.error';

export function getErrorStack(err) {
  if (!err.stack) {
    return;
  }
  return err.stack.split('\n').map(function(line) {
    return line.trim();
  });
}

export const MALFORMED_REQUEST = 'MalformedRequest';
