import { createParamDecorator } from '@nestjs/common';

export const RequestPayloads = createParamDecorator((data, req): any => {
  return req.args[0].reqPayloads;
});
