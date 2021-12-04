import { BullModule } from "@anchan828/nest-bullmq";
import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { ScheduleModule } from "@nestjs/schedule";
import { ENV } from "src/ENV";
import { LoggerModule } from "../@application/logger/logger.module";
import { DatabaseModule } from "./databases/db.module";

const MODULES = [
  DatabaseModule,
  HttpModule,
];

@Module({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class CommonModule {}
