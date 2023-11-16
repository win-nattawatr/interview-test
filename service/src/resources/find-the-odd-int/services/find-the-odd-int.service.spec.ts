import { Test, TestingModule } from '@nestjs/testing';
import { FindTheOddIntService } from './find-the-odd-int.service';
import { InvalidDataException } from '../../../exceptions/invalid-data.exception';

describe('FindTheOddIntService', () => {
  let service: FindTheOddIntService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [FindTheOddIntService],
    }).compile();

    service = module.get<FindTheOddIntService>(FindTheOddIntService);
  });

  afterAll(() => {
    module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be return odd times int', () => {
    expect(service.find([7])).toBe(7);
    expect(service.find([0])).toBe(0);
    expect(service.find([1, 1, 2])).toBe(2);
    expect(service.find([0, 1, 0, 1, 0])).toBe(0);
    expect(service.find([1, 2, 2, 3, 3, 3, 4, 3, 3, 3, 2, 2, 1])).toBe(4);
  });

  it('should be return first odd times int when matched more than 1 time', () => {
    expect(service.find([1, 1, 1, 2])).toBe(1);
    expect(service.find([1, 2, 2, 2])).toBe(1);
  });

  it('should be return null when not found or empty array', () => {
    expect(service.find([1, 1])).toBeNull();
    expect(service.find([])).toBeNull();
  });

  it('should be throw InvalidDataException', () => {
    let invalidInput = ['1', 2, true] as unknown as any[];
    expect(() => service.find(invalidInput)).toThrow(InvalidDataException);
    invalidInput = null as unknown as number[];
    expect(() => service.find(invalidInput)).toThrow(InvalidDataException);
    invalidInput = undefined as unknown as number[];
    expect(() => service.find(invalidInput)).toThrow(InvalidDataException);
  });
});
