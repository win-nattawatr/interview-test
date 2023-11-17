import { Controller } from '@nestjs/common';
import { CountTheSmileyFacesService } from '../services/count-the-smiley-faces.service';
import { MessagePattern, RpcException } from '@nestjs/microservices';

@Controller()
export class CountTheSmileyFacesController {
  constructor(
    private readonly countTheSmileyFacesService: CountTheSmileyFacesService,
  ) {}

  @MessagePattern({ name: 'countTheSmileyFaces', cmd: 'find' })
  handleFindTheOddIntFind(input: string[]): number {
    try {
      return this.countTheSmileyFacesService.find(input);
    } catch (e) {
      throw new RpcException({ name: e.name, message: e.message });
    }
  }
}
