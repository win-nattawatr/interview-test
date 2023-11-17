import { Test, TestingModule } from '@nestjs/testing';
import { PermutationsService } from './permutations.service';
import { InvalidDataException } from '../../../exceptions/invalid-data.exception';

describe('PermutationsService', () => {
  let service: PermutationsService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [PermutationsService],
    }).compile();

    service = module.get<PermutationsService>(PermutationsService);
  });

  afterAll(() => {
    module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be return valid permutations', () => {
    expect(service.createPermutations('a')).toEqual(['a']);

    expect(service.createPermutations('ab')).toEqual(['ab', 'ba']);

    expect(service.createPermutations('abc')).toEqual([
      'abc',
      'acb',
      'bac',
      'bca',
      'cab',
      'cba',
    ]);

    expect(service.createPermutations('aabb')).toEqual([
      'aabb',
      'abab',
      'abba',
      'baab',
      'baba',
      'bbaa',
    ]);

    expect(service.createPermutations('abcd')).toEqual([
      'abcd',
      'abdc',
      'acbd',
      'acdb',
      'adbc',
      'adcb',
      'bacd',
      'badc',
      'bcad',
      'bcda',
      'bdac',
      'bdca',
      'cabd',
      'cadb',
      'cbad',
      'cbda',
      'cdab',
      'cdba',
      'dabc',
      'dacb',
      'dbac',
      'dbca',
      'dcab',
      'dcba',
    ]);
  });

  it('should be return unique permutations', () => {
    const isArrayUnique = (arr: string[]) =>
      Array.isArray(arr) && new Set(arr).size === arr.length;

    expect(isArrayUnique(service.createPermutations('aba'))).toBeTruthy();
    expect(isArrayUnique(service.createPermutations('abba'))).toBeTruthy();
    expect(isArrayUnique(service.createPermutations('abccba'))).toBeTruthy();
  });

  it('should be throw InvalidDataException', () => {
    let invalidInput = 1 as unknown as string;
    expect(() => service.createPermutations(invalidInput)).toThrow(
      InvalidDataException,
    );

    invalidInput = null as unknown as string;
    expect(() => service.createPermutations(invalidInput)).toThrow(
      InvalidDataException,
    );

    invalidInput = undefined as unknown as string;
    expect(() => service.createPermutations(invalidInput)).toThrow(
      InvalidDataException,
    );
  });
});
