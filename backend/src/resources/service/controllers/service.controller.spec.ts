import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { ServiceController } from './service.controller';
import { mockResponse } from '../../../helpers/test/mock-response';
import { of, throwError } from 'rxjs';

describe('ServiceController', () => {
  let controller: ServiceController;
  let module: TestingModule;

  const mockServiceServiceClientProxy = {
    send: () => jest.fn(),
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ServiceController],
      providers: [
        {
          provide: 'SERVICE_SERVICE',
          useValue: mockServiceServiceClientProxy,
        },
      ],
    }).compile();

    controller = module.get<ServiceController>(ServiceController);
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
    const mockData = ['abc', 'acb', 'bac', 'bca', 'cab', 'cba'];
    mockServiceServiceClientProxy.send = jest
      .fn()
      .mockImplementation(() => of(mockData));

    await controller.createPermutations({ input: 'abc' }, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(mockResponse.json).toHaveBeenCalledWith(mockData);
  });

  it('should be throw BadRequestException', async () => {
    await expect(
      controller.createPermutations({ input: '' }, mockResponse),
    ).rejects.toThrow(BadRequestException);

    await expect(
      controller.createPermutations({ input: '' }, mockResponse),
    ).rejects.toThrow(
      expect.objectContaining({
        name: 'BadRequestException',
        message: "'input' is required",
      }),
    );
  });

  it('should be throw InternalServerErrorException', async () => {
    mockServiceServiceClientProxy.send = jest
      .fn()
      .mockImplementation(() => throwError(() => new Error('unknown error')));

    await expect(
      controller.createPermutations({ input: 'abc' }, mockResponse),
    ).rejects.toThrow(InternalServerErrorException);

    await expect(
      controller.createPermutations({ input: 'abc' }, mockResponse),
    ).rejects.toThrow(
      expect.objectContaining({
        name: 'InternalServerErrorException',
        message: 'unknown error',
      }),
    );
  });

  it('should be return findTheOddInt result', async () => {
    const mockData = 1;
    mockServiceServiceClientProxy.send = jest
      .fn()
      .mockImplementation(() => of(mockData));

    await controller.findTheOddInt({ input: [1, 2, 2] }, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(mockResponse.json).toHaveBeenCalledWith(mockData);
  });

  it('should be throw BadRequestException', async () => {
    await expect(
      controller.findTheOddInt({ input: undefined }, mockResponse),
    ).rejects.toThrow(BadRequestException);

    await expect(
      controller.findTheOddInt({ input: undefined }, mockResponse),
    ).rejects.toThrow(
      expect.objectContaining({
        name: 'BadRequestException',
        message: "'input' is required",
      }),
    );
  });

  it('should be throw InternalServerErrorException', async () => {
    mockServiceServiceClientProxy.send = jest
      .fn()
      .mockImplementation(() => throwError(() => new Error('unknown error')));

    await expect(
      controller.findTheOddInt({ input: [1, 2, 2] }, mockResponse),
    ).rejects.toThrow(InternalServerErrorException);

    await expect(
      controller.findTheOddInt({ input: [1, 2, 2] }, mockResponse),
    ).rejects.toThrow(
      expect.objectContaining({
        name: 'InternalServerErrorException',
        message: 'unknown error',
      }),
    );
  });

  it('should be return countTheSmileyFaces result', async () => {
    const mockData = 1;
    mockServiceServiceClientProxy.send = jest
      .fn()
      .mockImplementation(() => of(mockData));

    await controller.countTheSmileyFaces(
      { input: [':-)', ';/'] },
      mockResponse,
    );
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(mockResponse.json).toHaveBeenCalledWith(mockData);
  });

  it('should be throw BadRequestException', async () => {
    await expect(
      controller.countTheSmileyFaces({ input: undefined }, mockResponse),
    ).rejects.toThrow(BadRequestException);

    await expect(
      controller.countTheSmileyFaces({ input: undefined }, mockResponse),
    ).rejects.toThrow(
      expect.objectContaining({
        name: 'BadRequestException',
        message: "'input' is required",
      }),
    );
  });

  it('should be throw InternalServerErrorException', async () => {
    mockServiceServiceClientProxy.send = jest
      .fn()
      .mockImplementation(() => throwError(() => new Error('unknown error')));

    await expect(
      controller.countTheSmileyFaces({ input: [':-)', ';/'] }, mockResponse),
    ).rejects.toThrow(InternalServerErrorException);

    await expect(
      controller.countTheSmileyFaces({ input: [':-)', ';/'] }, mockResponse),
    ).rejects.toThrow(
      expect.objectContaining({
        name: 'InternalServerErrorException',
        message: 'unknown error',
      }),
    );
  });
});
