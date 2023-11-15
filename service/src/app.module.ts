import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configurations/configuration.factory';
import { PermutationsModule } from './resources/permutations/permutations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    PermutationsModule,
  ],
})
export class AppModule {}
