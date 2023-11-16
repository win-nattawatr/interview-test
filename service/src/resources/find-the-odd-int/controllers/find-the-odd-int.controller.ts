import { Controller } from '@nestjs/common';
import { FindTheOddIntService } from '../services/find-the-odd-int.service';
import { MessagePattern, RpcException } from '@nestjs/microservices';

@Controller()
export class FindTheOddIntController {
  constructor(private readonly findTheOddIntService: FindTheOddIntService) {}

  @MessagePattern({ name: 'findTheOddInt', cmd: 'find' })
  handleFindTheOddIntFind(input: number[]): number {
    try {
      return this.findTheOddIntService.find(input);
    } catch (e) {
      throw new RpcException({ name: e.name, message: e.message });
    }
  }
}
