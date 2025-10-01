import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import process from 'node:process';

async function bootstrap(): Promise<void> {
  console.log(process.env.PORT);
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
