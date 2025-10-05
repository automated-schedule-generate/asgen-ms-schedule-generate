import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { GenerateScheduleModule } from './modules/generate-schedule/generate-schedule.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [DatabaseModule, AuthModule, GenerateScheduleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
