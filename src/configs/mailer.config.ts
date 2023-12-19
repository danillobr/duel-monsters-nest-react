import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerOptions } from '@nestjs-modules/mailer';
import * as path from 'path';
import 'dotenv/config';

export const mailerConfig: MailerOptions = {
  template: {
    dir: path.resolve('./templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      extName: '.hbs',
      layoutsDir: path.resolve('./templates'),
    },
  },
  transport: 'smtps://user@domain.com:pass@smtp.domain.com',
};
