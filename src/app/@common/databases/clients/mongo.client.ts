import { ENV } from 'src/ENV';

export class MongoClient {
  public getMongoConfig() {
    return {
      // uri: `mongodb://${ENV.MONGO_USER}:${ENV.MONGO_PASSWORD}@${ENV.MONGO_HOST}:${ENV.MONGO_PORT}/${ENV.MONGO_DB}`,
      uri: `mongodb://${ENV.MONGO_HOST}:${ENV.MONGO_PORT}/${ENV.MONGO_DB}`,
      options: {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
    };
  }
}
