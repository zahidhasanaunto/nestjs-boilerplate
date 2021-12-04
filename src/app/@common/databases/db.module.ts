import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongoClient } from './clients/mongo.client';
import { PostgresClient } from './clients/pg.client';

const mongo = new MongoClient().getMongoConfig();
const pg = new PostgresClient().getPostgresConfig();
// console.log("🚀 ~ file: db.module.ts ~ line 9 ~ pg", pg);


@Module({
  imports: [
    // MongooseModule.forRoot(mongo.uri, mongo.options),
    TypeOrmModule.forRoot(pg),
  ],
})
export class DatabaseModule { }
