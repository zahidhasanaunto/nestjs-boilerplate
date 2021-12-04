import * as env from 'dotenv';
import * as path from 'path';
import { toBool } from './src/app/@application/utils/util.function';
import * as fs from 'fs';

env.config({
  path: path.join(
    process.cwd(),
    'environments',
    `${process.env.NODE_ENV || 'development'}.env`
  ),
});

const {
  TYPEORM_CONNECTION,
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE,
  TYPEORM_SYNCHRONIZE,
  TYPEORM_LOGGING,
  TYPEORM_SSLMODE,
  TYPEORM_CA_PATH,
  TYPEORM_REJECT_UNAUTHORIZED,
} = process.env;

module.exports = {
  type: TYPEORM_CONNECTION,
  host: TYPEORM_HOST,
  port: +TYPEORM_PORT,
  username: TYPEORM_USERNAME,
  password: TYPEORM_PASSWORD,
  database: TYPEORM_DATABASE,
  ssl: TYPEORM_SSLMODE
    ? {
        ca: toBool(TYPEORM_SSLMODE)
          ? fs.readFileSync(process.env.TYPEORM_CA_PATH).toString()
          : null,
        rejectUnauthorized: toBool(TYPEORM_REJECT_UNAUTHORIZED) || false,
      }
    : false,
  entities: ['src/app/**/*.entity{.ts,.js}'],
  migrations: ['src/app/database/migrations/*{.ts,.js}'],
  factories: ['src/app/database/factories/**/*{.ts,.js}'],
  seeds: ['dist/src/app/@common/database/seeds/**/*.js'],
  cli: {
    migrationsDir: 'src/app/database/migrations',
  },
  synchronize: TYPEORM_SYNCHRONIZE,
  logging: TYPEORM_LOGGING,
  autoLoadEntities: true,
};
