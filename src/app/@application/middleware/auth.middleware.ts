import { Injectable, NestMiddleware } from '@nestjs/common';
import { UnauthorizedRequestError } from '../errors/unauthorizedRequest.error';
import { JWTHelper } from '../helpers';
import { extractToken } from '../utils/util.function';
import { RequestMethods } from './../enums/index';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtHelper: JWTHelper) {}

  async use(req: any, res: Response, next: Function) {
    const token = extractToken(req.headers);
    if (token) {
      const verifiedUser = await this.jwtHelper.verify(token);
      // const verifiedPermission = await this.jwtHelper.verify(
      //   verifiedUser.permissions
      // );

      // req.permissions = verifiedPermission.permissions;
      req.authenticatedUser = {
        id: verifiedUser.id,
        name: verifiedUser.name,
        phoneNumber: verifiedUser.phoneNumber,
        userType: verifiedUser.userType,
      };
      if (req.method === RequestMethods.POST) {
        req.body.createdBy = verifiedUser.name;
      } else if (req.method === RequestMethods.PUT) {
        req.body.updatedBy = verifiedUser.name;
      } else if (req.method === RequestMethods.DELETE) {
        req.body.deletedBy = verifiedUser.name;
      }
      next();
    } else {
      throw new UnauthorizedRequestError();
    }
  }
}
