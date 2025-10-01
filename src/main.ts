import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envData } from './configuration';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  await app.listen(envData.port ?? 3000);
}
bootstrap();
