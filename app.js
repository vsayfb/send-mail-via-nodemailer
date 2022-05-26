import dotenv from "dotenv";
import { MailService } from "./MailService.js";

dotenv.config();

if (dotenv.config().error) {
  throw new Error("Env file not found!");
}

new MailService().sendMail();
