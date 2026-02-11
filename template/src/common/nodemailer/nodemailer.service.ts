import { Inject, Injectable } from '@nestjs/common';
import { CreateNodemailerDto } from './dto/create-nodemailer.dto';
import { UpdateNodemailerDto } from './dto/update-nodemailer.dto';
import { MailerService } from '@nestjs-modules/mailer';
import * as path from 'path';
import { link, linkSync, stat } from 'fs';
const templatePath = 'otp';
const templateIndex = 'index';
const templatePayment = 'payment';

// path.join(__dirname, '../template/index.hbs', '')

@Injectable()
export class NodemailerService {
  constructor(
    @Inject('MAILER_CONTACT') private readonly ContactMailer: MailerService,
    @Inject('MAILER_NEWSLETTER') private readonly NewsletterMailer: MailerService,
    @Inject('MAILER_SERVICE') private readonly mailerService: MailerService,
  ) {}
  public senderEmail(
    to: string,
    subject: string,
    text: string,
    html: string,
  ): void {
    this.mailerService
      .sendMail({
        to: to,
        from: process.env.EMAIL_SENDER,
        subject: subject,
        template: 'welcome', // please create your tample .hbs
        context:{
          text
        }
      })
      .then((success) => {
        return {
          success: true,
          result: success,
        };
      })
      .catch((err) => {
        return {
          success: false,
          result: err,
        };
      });
  }

  async newsletter(
    to: string,
    subject: string,
    content: string,
  ) {
    let result = await this.NewsletterMailer.sendMail({
      to: to,
      from: process.env.NEWSLETTER_SENDER,
      subject: subject,
      template: 'newsletter', // The `.pug` or `.hbs` extension is appended automatically.
      context: {
        content
      },
    });
    return result;
  }

  async Contact(
    to: string,
    subject: string,
    content: string,
  ) {
    let result = await this.ContactMailer.sendMail({
      to: to,
      from: process.env.EMAIL_SENDER,
      subject: subject,
      template: 'contact', // The `.pug` or `.hbs` extension is appended automatically.
      context: {
        content
      },
    });
    return result;
  }

}
