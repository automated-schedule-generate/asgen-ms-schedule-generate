import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { GenerateScheduleModule } from './modules/generate-schedule/generate-schedule.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [DatabaseModule, AuthModule, GenerateScheduleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
