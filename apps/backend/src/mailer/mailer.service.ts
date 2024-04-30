import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { SendMailOptions, Transporter, createTransport } from 'nodemailer'
import { mailerConfig } from '../config/mailer.config'

@Injectable()
export class MailerService {
  private readonly transporter: Transporter
  constructor(
    @Inject(mailerConfig.KEY)
    private readonly mailerConf: ConfigType<typeof mailerConfig>,
  ) {
    this.transporter = createTransport(this.mailerConf)
  }

  send({
    to,
    subject,
    text,
  }: Pick<SendMailOptions, 'to' | 'subject' | 'text'>): Promise<void> {
    return this.transporter.sendMail({
      from: this.mailerConf.auth.user,
      to,
      subject,
      text,
    })
  }
}
