import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { NodemailerService } from './nodemailer.service';
import { CreateNodemailerDto } from './dto/create-nodemailer.dto';
import { UpdateNodemailerDto } from './dto/update-nodemailer.dto';
import { Response } from 'express';



@Controller({
  path: '/nodemailer',
  version: '1',
})
export class NodemailerController {
  constructor(private readonly nodemailerService: NodemailerService) {}

  @Post('mail')
  create(@Body() createNodemailerDto: any) {
    return this.nodemailerService.senderEmail(
      createNodemailerDto.to,
      createNodemailerDto.subject,
      createNodemailerDto.text,
      createNodemailerDto.html,
    );
  }

  @Post('newsletter')
  async send(@Body() createNodemailerDto: any) {
    const result = await this.nodemailerService.newsletter(
      createNodemailerDto.to,
      createNodemailerDto.subject,
      createNodemailerDto.name,
    );

    return result;
  }

  @Post('contact')
  send2(@Body() createNodemailerDto: any) {
    return this.nodemailerService.Contact(
      createNodemailerDto.to,
      createNodemailerDto.subject,
      'Contactez nous au +225 00000000000',
    );
  }
}
