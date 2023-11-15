import { Injectable } from '@nestjs/common';
import { InvalidDataException } from '../../../exceptions/invalid-data.exception';

@Injectable()
export class PermutationsService {
  createPermutations(input: string): string[] {
    this.validateInput(input);

    const permutationsSet = new Set<string>();
    for (const permutationChars of this.getPermutationsIterator(input)) {
      permutationsSet.add(permutationChars.join(''));
    }

    return [...permutationsSet];
  }

  private validateInput(input: string): void {
    if (!input) throw new InvalidDataException('Input must be provided');

    if (!(typeof input === 'string'))
      throw new InvalidDataException('Input must be a string');
  }

  private *getPermutationsIterator(inputString: string): Generator<string[]> {
    const inputArray = inputString.split('');

    for (const perm of this.permutations(inputArray)) {
      yield perm;
    }
  }

  private *permutations(array: string[]): Generator<string[]> {
    if (array.length <= 1) {
      yield array;
    } else {
      for (let i = 0; i < array.length; i++) {
        const [current] = array.splice(i, 1);
        for (const perm of this.permutations(array)) {
          yield [current, ...perm];
        }
        array.splice(i, 0, current);
      }
    }
  }
}
