import { Module } from '@nestjs/common';
import { FindTheOddIntService } from './services/find-the-odd-int.service';
import { FindTheOddIntController } from './controllers/find-the-odd-int.controller';

@Module({
  controllers: [FindTheOddIntController],
  providers: [FindTheOddIntService],
})
export class FindTheOddIntModule {}
