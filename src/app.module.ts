import { HelperModule } from './app/@application/helpers/helper.module';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { FilterException } from './app/@application/exceptions/filter.exception';
import { PermissionGuard } from './app/@application/guards/permission.quard';
import { FilterResponseInterceptor } from './app/@application/interceptors/filterResponse.interceptor';
import { AuthMiddleware } from './app/@application/middleware/auth.middleware';
import { ErrorHandlerMiddleware } from './app/@application/middleware/errorHandler.middleware';
import { RequestModifierMiddleware } from './app/@application/middleware/requestModifier.middleware';
import { CommonModule } from './app/@common/common.module';
import { AuthModule } from './app/@modules/auth/auth.module';
import { UserModule } from './app/@modules/user/user.module';

@Module({
  imports: [CommonModule, HelperModule, AuthModule, UserModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: FilterResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: FilterException,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes({ path: '*', method: RequestMethod.ALL });
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/users', method: RequestMethod.ALL },
        { path: '/patients', method: RequestMethod.ALL },
        { path: '/addresses', method: RequestMethod.ALL }
      );

    consumer.apply(ErrorHandlerMiddleware).forRoutes('*');
    consumer.apply(RequestModifierMiddleware).forRoutes('*');
  }
}
