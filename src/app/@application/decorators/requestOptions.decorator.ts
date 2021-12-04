import { IOptions } from './../interfaces/option.interface';
import { createParamDecorator } from '@nestjs/common';

export const RequestOptions = createParamDecorator(
  (data, req): IOptions => {
    return req.args[0].reqOptions;
  }
);
