import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { google } from 'googleapis';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import 'dotenv/config';

export interface EmailOptions {
  transporterName?: string;
  to: string;
  from: string;
  subject: string;
  template: string;
  context: {
    token: string;
  };
}

@Injectable()
export class MailingService {
  constructor(private readonly mailerService: MailerService) {}

  private async setTransport() {
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      'https://developers.google.com/oauthplayground',
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    const accessToken: string = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject('Failed to create access token');
        }
        resolve(token);
      });
    });

    const config: SMTPTransport.Options = {
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        accessToken,
      },
    };
    this.mailerService.addTransporter('gmail', config);
  }

  public async sendMail(emailOptions: EmailOptions) {
    await this.setTransport();

    emailOptions.transporterName = 'gmail';

    try {
      await this.mailerService.sendMail(emailOptions);
    } catch (error) {
      throw new Error('Erro ao se comunicar com Gmail Google');
    }
  }
}
