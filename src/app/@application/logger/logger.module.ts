import { Module } from '@nestjs/common';
import * as winston from 'winston';
import { LoggerService } from './logging/logger.service';

@Module({
  imports: [],
  providers: [
    {
      provide: LoggerService,
      useFactory: (service: LoggerService) => {
        const loggers = [
          LoggerService.console({
            timeFormat: 'HH:mm',
            consoleOptions: {
              level: 'info',
            },
          }),
          LoggerService.rotate({
            colorize: false,
            fileOptions: {
              filename: `${process.cwd()}/logs/error/Sherlock-%DATE%.log`,
              level: 'error',
              maxSize: 100000,
              zippedArchive: true,
            },
          }),

          LoggerService.rotate({
            colorize: false,
            fileOptions: {
              filename: `${process.cwd()}/logs/info/Sherlock-%DATE%.log`,
              level: 'info',
              maxSize: 100000,
              zippedArchive: true,
            },
          }),

          LoggerService.rotate({
            colorize: false,
            fileOptions: {
              filename: `${process.cwd()}/logs/warning/Sherlock-%DATE%.log`,
              level: 'warning',
              maxSize: 100000,
              zippedArchive: true,
            },
          }),
        ];
        const loggerOptions: winston.LoggerOptions = {
          level: 'error',
        };

        return new LoggerService(loggerOptions, loggers);
      },
      inject: [],
    },
  ],
  exports: [LoggerService],
})
export class LoggerModule {}
