import { Response } from 'express';

export const mockResponse = {
  json: jest.fn(),
  send: jest.fn(),
  status: jest.fn().mockImplementation(() => mockResponse),
} as unknown as Response;
