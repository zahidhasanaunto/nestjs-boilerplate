import { decode, sign, verify, destroy } from 'jsonwebtoken';
import { ENV } from 'src/ENV';
import { Service } from 'typedi';

const JWT_SECRET: string = ENV.JWT_SECRET;

@Service()
export class JWTHelper {
  //! JWT Sign
  public async sign(payload: any, options: any) {
    return sign(payload, JWT_SECRET, options);
  }

  //! JWT Verify
  public async verify(token: string) {
    return verify(token, JWT_SECRET);
  }

  //! JWT MakeAccessToken
  public async makeAccessToken(data: any) {
    const configAccess = {
      payload: {
        ...data,
      },
      options: {
        algorithm: 'HS512',
        expiresIn: ENV.EXPIRES_IN,
      },
    };
    const token = await this.sign(configAccess.payload, configAccess.options);
    const tokenData = decode(token);
    const exp = tokenData.exp;
    return { token, exp };
  }

  public async makePermissionToken(permissions: String[]) {
    const configAccess = {
      payload: { permissions },
      options: {
        algorithm: 'HS512',
        expiresIn: ENV.EXPIRES_IN,
      },
    };
    const token = await this.sign(configAccess.payload, configAccess.options);
    const tokenData = decode(token);
    const exp = tokenData.exp;
    return token;
  }
}
