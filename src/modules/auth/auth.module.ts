import { Module } from '@nestjs/common';
import { AuthGuard } from './guards/';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [],
  controllers: [],
  providers: [
    AuthGuard,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [],
})
export class AuthModule {}
