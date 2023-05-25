import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerOptions } from '@nestjs-modules/mailer';
import * as path from 'path';

export const mailerConfig: MailerOptions = {
  template: {
    dir: path.resolve(__dirname, '..', '..', 'templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      extName: '.hbs',
      layoutsDir: path.resolve(__dirname, '..', '..', 'templates'),
    },
  },
  transport: {
    host: process.env.EMAIL_HOST, //host smtp
    secure: false, //regras de segurança do serviço smtp
    port: process.env.EMAIL_PORT, // porta
    auth: {
      //dados do usuário e senha
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    ignoreTLS: true,
  },
  defaults: {
    // configurações que podem ser padrões
    from: '"',
  },
};
