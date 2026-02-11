import { Module } from '@nestjs/common';
import { NodemailerService } from './nodemailer.service';
import { NodemailerController } from './nodemailer.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { join } from 'path';
import { NewsletterMailerModule } from './newsletters.module';
import { ServiceMailerModule } from './service-global.module';
import { ContactMailerModule } from './contacts.module';

@Module({
  imports: [
    NewsletterMailerModule,
    ServiceMailerModule,
    ContactMailerModule,
  ],
  controllers: [NodemailerController],
  providers: [NodemailerService],
  exports: [
    NodemailerService,
    NewsletterMailerModule,
    ServiceMailerModule,
    ContactMailerModule,
  ],
})
export class NodemailerModule {}
