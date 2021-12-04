// import { initWebSocketAdapters } from './app/@socket/adapter';
import { NestApplicationOptions } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";
import * as chalk from "chalk";
import * as helmet from "helmet";
import { AppModule } from "./app.module";
import { FilterRequestInterceptor } from "./app/@application/interceptors/filterRequest.interceptor";
import { createDocument } from "./app/@application/swagger/swagger";
import { ENV } from "./ENV";

const appOptions: NestApplicationOptions = {
  cors: true,
};
console.log(process.cwd());
async function bootstrap() {
  const app = await NestFactory.create(AppModule, appOptions);
  app.setGlobalPrefix(ENV.API_PREFIX);

  app.enableCors();
  app.use(helmet());

  // app.use(app.router);

  // app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new FilterRequestInterceptor());
  console.log(
    "🚀 ~ file: main.ts ~ line 28 ~ bootstrap ~ ENV.API_PREFIX",
    ENV.API_PREFIX
  );

  SwaggerModule.setup("/docs", app, createDocument(app));

  await app.listen(ENV.port);

  console.log(
    chalk.green.bold(`Sherlock-Auth running on ==> ${await app.getUrl()}`)
  );
}
bootstrap();
