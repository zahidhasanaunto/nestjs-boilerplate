import { ENV } from './../../../../ENV';
import { ormConfig } from './../../../../ENV';
export class PostgresClient {
  public getPostgresConfig() {
    return ormConfig as any;
  }
}
