import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ServiceController } from './controllers/service.controller';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync({
      clients: [
        {
          name: 'SERVICE_SERVICE',
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            transport: Transport.TCP,
            options: {
              host: configService.get<string>('app.microservices.service.host'),
              port: configService.get<number>('app.microservices.service.port'),
            },
          }),
        },
      ],
    }),
  ],
  controllers: [ServiceController],
})
export class ServiceModule {}
