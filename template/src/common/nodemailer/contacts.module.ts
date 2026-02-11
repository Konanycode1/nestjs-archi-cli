// support-mailer.module.ts
import { Module } from '@nestjs/common';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
const isProd = process.env.NODE_ENV === 'production';
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.CONTACT_HOST,
        port: Number(process.env.CONTACT_PORT ?? 587),
        secure: false,
        auth: {
          user: process.env.CONTACT_USER,
          pass: process.env.CONTACT_PASS,
        },
        tls: {
          rejectUnauthorized: false, // Allow self-signed certificates
        },
      },
      defaults: { from: process.env.CONTACT_SENDER },
      template: {
        dir: isProd
          ? join(process.cwd(), 'dist', 'src', 'template') // <-- là où tu as copié
          : join(process.cwd(), 'src', 'template'),
        adapter: new HandlebarsAdapter(),
        options: { strict: true },
      },
    }),
  ],
  // expose l’instance MailerService de CE module sous un token distinct
  providers: [{ provide: 'MAILER_CONTACT', useExisting: MailerService }],
  exports: ['MAILER_CONTACT'],
})
export class ContactMailerModule {}
