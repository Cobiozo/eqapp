
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import config from "~/config.server";

class MailService {
  transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.mail.host,
      port: 587,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: config.mail.auth.user,
        pass: config.mail.auth.pass,
      }
    });
  }

  prepareContent(content: string) {
    return `
      <div style="letter-spacing: 0.1em; max-width: 30em; margin: 1em;">
        <h1>EQApp</h1>
        ${content}
        <hr>
        <p style="font-size: 0.8em; color: #999;">
          This is an automated message. Please do not reply to this email.
        </p>
      </div>
    `;
  }

  async sendMail(
    to: string,
    subject: string,
    text: string,
    throwOnFail: boolean = false
  ) {
    try {
      return await new Promise((resolve, reject) => {
        this.transporter.sendMail({
          from: {
            name: config.mail.from.name,
            address: config.mail.from.mail,
          },
          to,
          envelope: {
            from: `${config.mail.from.name} <${config.mail.from.mail}>`,
            to: `${to}`
          },
          subject,
          html: this.prepareContent(text)
        }, (error) => {
          if (error) { reject(error) }
          else { resolve(true) }
        });
      });
    } catch (error) {
      console.log(error)
      if (throwOnFail) throw error;
      return false;
    }
  }
}

const mailService = new MailService();
export default mailService;
