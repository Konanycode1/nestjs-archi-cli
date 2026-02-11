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
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT ?? 587),
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false, // Allow self-signed certificates
        },
      },
      defaults: { from: process.env.EMAIL_SENDER },
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
  providers: [{ provide: 'MAILER_SERVICE', useExisting: MailerService }],
  exports: ['MAILER_SERVICE'],
})
export class ServiceMailerModule {}
