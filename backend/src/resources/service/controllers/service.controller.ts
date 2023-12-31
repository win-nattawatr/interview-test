import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  InternalServerErrorException,
  Post,
  Res,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Response } from 'express';
import { lastValueFrom } from 'rxjs';

@Controller('service')
export class ServiceController {
  constructor(
    @Inject('SERVICE_SERVICE') private readonly serviceClient: ClientProxy,
  ) {}

  @Post('permutations')
  async createPermutations(
    @Body() body: { input: string },
    @Res() res: Response,
  ) {
    if (!body.input) throw new BadRequestException(`'input' is required`);

    try {
      const result = await lastValueFrom(
        this.serviceClient.send<string[]>(
          { name: 'permutations', cmd: 'create' },
          body.input,
        ),
      );

      return res.status(200).json(result);
    } catch (e) {
      switch (e.name) {
        case 'InvalidDataException':
          throw new BadRequestException(e.message, {
            cause: e,
            description: e.name,
          });

        default:
          throw new InternalServerErrorException(e.message, {
            cause: e,
            description: e.name,
          });
      }
    }
  }

  @Post('findTheOddInt')
  async findTheOddInt(@Body() body: { input: number[] }, @Res() res: Response) {
    if (!body.input) throw new BadRequestException(`'input' is required`);

    try {
      const result = await lastValueFrom(
        this.serviceClient.send<number>(
          { name: 'findTheOddInt', cmd: 'find' },
          body.input,
        ),
      );

      return res.status(200).json(result);
    } catch (e) {
      switch (e.name) {
        case 'InvalidDataException':
          throw new BadRequestException(e.message, {
            cause: e,
            description: e.name,
          });

        default:
          throw new InternalServerErrorException(e.message, {
            cause: e,
            description: e.name,
          });
      }
    }
  }

  @Post('countTheSmileyFaces')
  async countTheSmileyFaces(
    @Body() body: { input: string[] },
    @Res() res: Response,
  ) {
    if (!body.input) throw new BadRequestException(`'input' is required`);

    try {
      const result = await lastValueFrom(
        this.serviceClient.send<number>(
          { name: 'countTheSmileyFaces', cmd: 'find' },
          body.input,
        ),
      );

      return res.status(200).json(result);
    } catch (e) {
      console.log(e);
      switch (e.name) {
        case 'InvalidDataException':
          throw new BadRequestException(e.message, {
            cause: e,
            description: e.name,
          });

        default:
          throw new InternalServerErrorException(e.message, {
            cause: e,
            description: e.name,
          });
      }
    }
  }
}
