import { Module } from '@nestjs/common';
import { BcryptHelper, JWTHelper } from '.';

const HELPERS = [JWTHelper, BcryptHelper];

@Module({
  providers: [...HELPERS],
  exports: [...HELPERS],
})
export class HelperModule {}
