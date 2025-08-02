import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import nodemailer from "nodemailer";
import { Attachment } from "nodemailer/lib/mailer";
import config from "../../app/config";
import { Knex } from "knex";
import Models from "../../models/rootModel";

class Lib {
  // send email by nodemailer
  public static async sendEmail({
    email,
    emailBody,
    emailSub,
    attachments,
  }: {
    email: string;
    emailSub: string;
    emailBody: string;
    attachments?: Attachment[];
  }) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        auth: {
          user: config.EMAIL_SEND_EMAIL_ID,
          pass: config.EMAIL_SEND_PASSWORD,
        },
      });

      const info = await transporter.sendMail({
        from: config.EMAIL_SEND_EMAIL_ID,
        to: email,
        subject: emailSub,
        html: emailBody,
        attachments: attachments || undefined,
      });

      console.log("Message send: %s", info);

      return true;
    } catch (err: any) {
      console.log({ err });
      return false;
    }
  }

  // Create hash string
  public static async hashValue(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  // verify hash string
  public static async compareHashValue(
    password: string,
    hashedPassword: string
  ) {
    return await bcrypt.compare(password, hashedPassword);
  }


  // create token
  public static createToken(
    payload: object,
    secret: string,
    expiresIn: SignOptions["expiresIn"]
  ) {
    return jwt.sign(payload, secret, { expiresIn });
  }

  // verify token
  public static verifyToken(token: string, secret: string) {
    try {
      return jwt.verify(token, secret);
    } catch (err) {
      return false;
    }
  }

  // generate random Number
  public static otpGenNumber(length: number) {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    let otp = "";

    for (let i = 0; i < length; i++) {
      const randomNumber = Math.floor(Math.random() * 10);

      otp += numbers[randomNumber];
    }

    return otp;
  }

  // compare object
  public static compareObj(a: any, b: any) {
    return JSON.stringify(a) == JSON.stringify(b);
  }


    //get formatted date
  public static getFormattedDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return { year, month, day };
  }



  //generate tracking id
   public static async generateTrackingId({
    trx,
  }: {
    trx?: Knex.Transaction;
  }) {
    const currentDate = Lib.getFormattedDate(new Date());

    const entryModel = new Models().LastServiceEntryModel(trx);

    const last_entry = await entryModel.getLastTrackingId();

    let code = 'CT';

    const tracking_id = `${code}${
      currentDate.year + currentDate.month + currentDate.day
    }${(Number(last_entry) + 1).toString().padStart(5, '0')}`;

    await entryModel.incrementLastRefId();

    return tracking_id;
  }


 
}
export default Lib;

