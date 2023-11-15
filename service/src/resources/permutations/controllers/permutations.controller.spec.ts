import { Test, TestingModule } from '@nestjs/testing';
import { PermutationsController } from './permutations.controller';
import { PermutationsService } from '../services/permutations.service';
import { RpcException } from '@nestjs/microservices';

describe('PermutationsController', () => {
  let controller: PermutationsController;
  let module: TestingModule;

  const mockPermutationsService = {
    createPermutations: () => jest.fn(),
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [PermutationsController],
      providers: [
        {
          provide: PermutationsService,
          useValue: mockPermutationsService,
        },
      ],
    }).compile();

    controller = module.get<PermutationsController>(PermutationsController);
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
    mockPermutationsService.createPermutations = jest
      .fn()
      .mockReturnValue(['ab', 'ba']);

    const response = controller.handlePermutationsCreate('ab');
    expect(response).toEqual(['ab', 'ba']);
  });

  it('should be throw RpcException', async () => {
    mockPermutationsService.createPermutations = jest
      .fn()
      .mockImplementation(() => {
        throw new Error('error');
      });

    expect(() => controller.handlePermutationsCreate('ab')).toThrow(
      RpcException,
    );
    expect(() => controller.handlePermutationsCreate('ab')).toThrow(
      expect.objectContaining({ message: 'error', name: 'Error' }),
    );
  });
});
