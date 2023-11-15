import { Module } from '@nestjs/common';
import { PermutationsService } from './services/permutations.service';
import { PermutationsController } from './controllers/permutations.controller';

@Module({
  controllers: [PermutationsController],
  providers: [PermutationsService],
})
export class PermutationsModule {}
