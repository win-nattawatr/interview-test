import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const configService = appContext.get(ConfigService);

  const microserviceOptions = {
    transport: Transport.TCP,
    options: {
      host: configService.get<string>('app.host'),
      port: configService.get<number>('app.port'),
    },
  };

  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions,
  );

  await app.listen();
}
bootstrap();
