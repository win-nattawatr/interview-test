import { Test, TestingModule } from '@nestjs/testing';
import { CountTheSmileyFacesController } from './count-the-smiley-faces.controller';
import { CountTheSmileyFacesService } from '../services/count-the-smiley-faces.service';
import { RpcException } from '@nestjs/microservices';

describe('CountTheSmileyFacesController', () => {
  let controller: CountTheSmileyFacesController;
  let module: TestingModule;

  const mockFindTheOddIntService = {
    find: () => jest.fn(),
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [CountTheSmileyFacesController],
      providers: [
        {
          provide: CountTheSmileyFacesService,
          useValue: mockFindTheOddIntService,
        },
      ],
    }).compile();

    controller = module.get<CountTheSmileyFacesController>(
      CountTheSmileyFacesController,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be return permutations array result', async () => {
    mockFindTheOddIntService.find = jest.fn().mockReturnValue(1);
    const response = controller.handleFindTheOddIntFind([':-)', ':]', ';~B']);
    expect(response).toEqual(1);
  });

  it('should be throw RpcException', async () => {
    mockFindTheOddIntService.find = jest.fn().mockImplementation(() => {
      throw new Error('error');
    });
    expect(() => controller.handleFindTheOddIntFind([':-)'])).toThrow(
      RpcException,
    );
    expect(() => controller.handleFindTheOddIntFind([':-)'])).toThrow(
      expect.objectContaining({ message: 'error', name: 'Error' }),
    );
  });
});
