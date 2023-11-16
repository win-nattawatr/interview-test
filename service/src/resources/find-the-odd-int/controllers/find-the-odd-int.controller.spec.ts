import { Test, TestingModule } from '@nestjs/testing';
import { FindTheOddIntController } from './find-the-odd-int.controller';
import { FindTheOddIntService } from '../services/find-the-odd-int.service';
import { RpcException } from '@nestjs/microservices';

describe('FindTheOddIntController', () => {
  let controller: FindTheOddIntController;
  let module: TestingModule;

  const mockFindTheOddIntService = {
    find: () => jest.fn(),
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [FindTheOddIntController],
      providers: [
        {
          provide: FindTheOddIntService,
          useValue: mockFindTheOddIntService,
        },
      ],
    }).compile();

    controller = module.get<FindTheOddIntController>(FindTheOddIntController);
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
    const response = controller.handleFindTheOddIntFind([1, 2, 2]);
    expect(response).toEqual(1);
  });

  it('should be throw RpcException', async () => {
    mockFindTheOddIntService.find = jest.fn().mockImplementation(() => {
      throw new Error('error');
    });
    expect(() => controller.handleFindTheOddIntFind([1, 2, 2])).toThrow(
      RpcException,
    );
    expect(() => controller.handleFindTheOddIntFind([1, 2, 2])).toThrow(
      expect.objectContaining({ message: 'error', name: 'Error' }),
    );
  });
});
