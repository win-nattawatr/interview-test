import { Injectable } from '@nestjs/common';
import { InvalidDataException } from '../../../exceptions/invalid-data.exception';

@Injectable()
export class CountTheSmileyFacesService {
  private readonly testRegex = /^[:;][-~]?[)D]$/;

  find(input: string[]): number | null {
    this.validateInput(input);

    return input.filter((x) => this.testRegex.test(x)).length;
  }

  private validateInput(input: string[]): void {
    if (!input) throw new InvalidDataException('Input must be defined');

    if (!(Array.isArray(input) && input.every((x) => typeof x === 'string')))
      throw new InvalidDataException('Input must be a string array');
  }
}
