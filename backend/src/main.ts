import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');

  const allowedOrigins = configService.get<string[]>('app.cors.allowedOrigins');
  const corsOptions: CorsOptions = {
    origin: allowedOrigins,
    credentials: true,
  };
  app.enableCors(corsOptions);

  const defaultPort = configService.get<number>('app.port');
  await app.listen(defaultPort);
}
bootstrap();
