import nodemailer from "nodemailer";
import { google } from "googleapis";

export class MailService {
  constructor() {
    const OAuth2 = google.auth.OAuth2;

    this.oauth2 = new OAuth2(
      process.env.ID,
      process.env.SECRET,
      process.env.CALLBACK_URL
    );

    this.oauth2.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });
  }

  #getAccessToken() {
    return this.oauth2.getAccessToken();
  }

  async #createTransport() {
    const { token } = await this.#getAccessToken();

    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MAIL,
        accessToken: token || "",
        refreshToken: process.env.REFRESH_TOKEN,
        clientId: process.env._ID,
        clientSecret: process.env.SECRET,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendMail() {
    const transporter = await this.#createTransport();

    await transporter.sendMail({
      from: process.env.MAIL, // sender address
      to: "receive@gmail.com", // list of receivers
      subject: "Welcome My App", // Subject line
      html: `<h1>Hello there</h1>`,
    });

    console.log("Mail sent.");
  }
}
