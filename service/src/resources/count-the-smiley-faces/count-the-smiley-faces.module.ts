import { Module } from '@nestjs/common';
import { CountTheSmileyFacesService } from './services/count-the-smiley-faces.service';
import { CountTheSmileyFacesController } from './controllers/count-the-smiley-faces.controller';

@Module({
  controllers: [CountTheSmileyFacesController],
  providers: [CountTheSmileyFacesService],
})
export class CountTheSmileyFacesModule {}
