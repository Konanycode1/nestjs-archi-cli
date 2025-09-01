import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { success } from 'zod';

@Controller({
  version: '1',
  path: 'app',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  async getHello(
    @Res() res: Response
  ): Promise<Response> {
    const result =  res.status(200).json({success: true, message: 'Hello World!'});
    return result
  }
}
