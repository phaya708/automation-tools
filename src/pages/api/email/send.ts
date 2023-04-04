import nodemailer from "nodemailer";
import csvParse from "csv-parse";
import { promisify } from "util";
import { NextApiRequest, NextApiResponse } from "next";
import { EmailConfigType } from "@/types/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const csvData: string[][] = req.body.csvData;
  const messageTemplete: string = req.body.message;
  const subject: string = req.body.subject;
  const config: EmailConfigType = req.body.config;

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    auth: {
      user: config.user,
      pass: config.password,
    },
  });

  try {
    await Promise.all(
      csvData.map(async (data) => {
        const message = messageTemplete
          .replace("{{id}}", data[0])
          .replace("{{name}}", data[1])
          .replace("{{password}}", data[3]);
        const mailOptions = {
          from: config.email,
          to: data[2],
          subject: subject,
          text: message,
        };
        await transporter.sendMail(mailOptions);
      })
    );
    res.status(200).send("メールを送信しました。");
  } catch (error) {
    console.error(error);
    res.status(500).send("メールの送信に失敗しました。");
  }
}
