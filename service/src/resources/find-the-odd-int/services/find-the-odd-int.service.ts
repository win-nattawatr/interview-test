import { Injectable } from '@nestjs/common';
import { InvalidDataException } from '../../../exceptions/invalid-data.exception';

@Injectable()
export class FindTheOddIntService {
  find(input: number[]): number | null {
    this.validateInput(input);

    const countMap: Record<number, number> = input.reduce((acc, num) => {
      acc[num] = (acc[num] || 0) + 1;
      return acc;
    }, {});

    for (const num in countMap) {
      if (countMap[num] % 2 !== 0) {
        return parseInt(num, 10);
      }
    }

    return null;
  }

  private validateInput(input: number[]): void {
    if (!input) throw new InvalidDataException('Input must be defined');

    if (!(Array.isArray(input) && input.every((x) => typeof x === 'number')))
      throw new InvalidDataException('Input must be a number array');
  }
}
