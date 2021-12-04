import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetAuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): any => {
    const request = ctx.switchToHttp().getRequest();
    return request.authenticatedUser;
  },
);
