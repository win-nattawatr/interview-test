import { Test, TestingModule } from '@nestjs/testing';
import { CountTheSmileyFacesService } from './count-the-smiley-faces.service';
import { InvalidDataException } from '../../../exceptions/invalid-data.exception';

describe('CountTheSmileyFacesService', () => {
  let service: CountTheSmileyFacesService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [CountTheSmileyFacesService],
    }).compile();

    service = module.get<CountTheSmileyFacesService>(
      CountTheSmileyFacesService,
    );
  });

  afterAll(() => {
    module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it(`should be return valid smiley faces's count`, () => {
    expect(service.find([':)', ';(', ';}', ':-D'])).toBe(2);
    expect(service.find([';D', ':-(', ':-)', ';~)'])).toBe(3);
    expect(service.find([';]', ':[', ';*', ':$', ';-D'])).toBe(1);
    expect(service.find([':~D', ':)', ';D', ':-)'])).toBe(4);
    expect(service.find([';]', ':[', ';*', ':$'])).toBe(0);

    expect(service.find([':~D:)', ':)', ';D:)', ':-)'])).toBe(2);
    expect(service.find([':~D:-(', ':)', ';D:-(', ':-)'])).toBe(2);
  });

  it('should be throw InvalidDataException', () => {
    let invalidInput = ['1', 2, true] as unknown as any[];
    expect(() => service.find(invalidInput)).toThrow(InvalidDataException);
    invalidInput = null as unknown as string[];
    expect(() => service.find(invalidInput)).toThrow(InvalidDataException);
    invalidInput = undefined as unknown as string[];
    expect(() => service.find(invalidInput)).toThrow(InvalidDataException);
  });
});
