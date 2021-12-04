import { createParamDecorator } from '@nestjs/common';

export const RequestParams = createParamDecorator((data, req): any => {
  return req.args[0].params;
});
