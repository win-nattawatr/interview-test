import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configurations/configuration.factory';
import { PermutationsModule } from './resources/permutations/permutations.module';
import { FindTheOddIntModule } from './resources/find-the-odd-int/find-the-odd-int.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    PermutationsModule,
    FindTheOddIntModule,
  ],
})
export class AppModule {}
