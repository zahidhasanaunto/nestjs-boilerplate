import { config } from "dotenv";
import * as path from "path";
import * as fs from "fs"
import { TypeOrmModuleOptions } from "@nestjs/typeorm/index";
import { toBool } from "./app/@application/utils/util.function";

config({
  path: path.join(
    process.cwd(),
    "environments",
    `${process.env.NODE_ENV || "development"}.env`
  ),
});

export const ENV_DEVELOPMENT = "development";
export const ENV_PRODUCTION = "production";
export const ENV_STAGING = "staging";

export const ENV = {
  port: +process.env.PORT,
  env: process.env.NODE_ENV || ENV_DEVELOPMENT,
  isProduction: process.env.NODE_ENV === ENV_PRODUCTION,
  isStaging: process.env.NODE_ENV === ENV_STAGING,
  isDevelopment: process.env.NODE_ENV === ENV_DEVELOPMENT,

  API_PREFIX: process.env.API_PREFIX,
  API_TITLE: process.env.API_TITLE,
  API_DESC: process.env.API_DESC,
  API_VERSION: process.env.API_VERSION,
  APP_QUEUE: process.env.APP_QUEUE,
  NOTIFICATION_QUEUE: process.env.NOTIFICATION_QUEUE,

  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,

  BULL_REDIS_HOST: process.env.BULL_REDIS_HOST,
  BULL_REDIS_PORT: process.env.BULL_REDIS_PORT,

  SOCKET_ADAPTER_REDIS_HOST: process.env.SOCKET_ADAPTER_REDIS_HOST,
  SOCKET_ADAPTER_REDIS_PORT: process.env.SOCKET_ADAPTER_REDIS_PORT,

  MONGO_HOST: process.env.MONGO_HOST,
  MONGO_PORT: process.env.MONGO_PORT,
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  MONGO_DB: process.env.MONGO_DB,

  FCM_SERVER_KEY: process.env.FCM_SERVER_KEY,
  FCM_API_ENDPOINT: process.env.FCM_API_ENDPOINT,

  // TYPEORM_CONNECTION: process.env.TYPEORM_CONNECTION,
  // TYPEORM_HOST: process.env.TYPEORM_HOST,
  // TYPEORM_PORT: process.env.TYPEORM_PORT,
  // TYPEORM_USERNAME: process.env.TYPEORM_USERNAME,
  // TYPEORM_PASSWORD: process.env.TYPEORM_PASSWORD,
  // TYPEORM_DATABASE: process.env.TYPEORM_DATABASE,
  // TYPEORM_SYNCHRONIZE: process.env.TYPEORM_SYNCHRONIZE,
  // TYPEORM_LOGGING: process.env.TYPEORM_LOGGING,
  // TYPEROM_AUTOLOAD_ENTITIES: process.env.TYPEROM_AUTOLOAD_ENTITIES,

  JWT_SECRET: process.env.JWT_SECRET,
  SALT_ROUNDS: process.env.SALT_ROUNDS,
  EXPIRES_IN: process.env.EXPIRES_IN,

  DEFAULT_USER_ROLE: process.env.DEFAULT_USER_ROLE,

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,

  MA_USER_EMAIL: process.env.MA_USER_EMAIL,
  MA_USER_PASSWORD: process.env.MA_USER_PASSWORD,
  MA_PHONE_NUMBER: process.env.MA_PHONE_NUMBER,


  personaDB: {
    type: process.env.TYPEORM_CONNECTION,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    database: process.env.TYPEORM_DATABASE,
    synchronize: process.env.TYPEORM_SYNCHRONIZE,
    logging: process.env.TYPEORM_LOGGING,
    sslMode: toBool(process.env.TYPEORM_SSLMODE) || false,
    ca: toBool(process.env.TYPEORM_SSLMODE)
      ? fs.readFileSync(process.env.TYPEORM_CA_PATH).toString()
      : null,
    rejectUnauthorized: process.env.TYPEORM_REJECT_UNAUTHORIZED,
  },
};


export const ormConfig: TypeOrmModuleOptions = {
  type: "postgres", 
  host: ENV.personaDB.host,
  port: +ENV.personaDB.port,
  username: ENV.personaDB.username,
  password: ENV.personaDB.password,
  database: ENV.personaDB.database,
  ssl: ENV.personaDB.sslMode
    ? {
      ca: ENV.personaDB.ca,
      rejectUnauthorized: toBool(ENV.personaDB.rejectUnauthorized),
    }
    : false,
  migrations: ["dist/migrations/*{.ts,.js}"],
  migrationsTableName: "migrations_persona_db",
  migrationsRun: false,
  // synchronize: toBool(ENV.personaDB.synchronize),
  synchronize: true,
  logging: toBool(ENV.personaDB.logging),
  autoLoadEntities: true,
};