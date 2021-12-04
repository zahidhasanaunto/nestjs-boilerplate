import { compare, hash } from 'bcryptjs';
import { ENV } from 'src/ENV';
import { Service } from 'typedi';

const SALT_ROUNDS: number = Number(ENV.SALT_ROUNDS) || 10;

@Service()
export class BcryptHelper {
  public async hashString(
    plainText: string,
    saltRounds: number = SALT_ROUNDS
  ): Promise<string> {
    return hash(plainText, saltRounds);
  }

  public async compareHash(
    plainText: string,
    hashString: string
  ): Promise<boolean> {
    return compare(plainText, hashString);
  }
}
