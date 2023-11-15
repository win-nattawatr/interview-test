import { Controller } from '@nestjs/common';
import { PermutationsService } from '../services/permutations.service';
import { MessagePattern, RpcException } from '@nestjs/microservices';

@Controller()
export class PermutationsController {
  constructor(private readonly permutationsService: PermutationsService) {}

  @MessagePattern({ name: 'permutations', cmd: 'create' })
  handlePermutationsCreate(input: string): string[] {
    try {
      return this.permutationsService.createPermutations(input);
    } catch (e) {
      throw new RpcException({ name: e.name, message: e.message });
    }
  }
}
