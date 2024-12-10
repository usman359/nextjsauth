import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

interface EmailType {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: EmailType) => {
  try {
    // create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    console.log(emailType);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    console.log("MAILTRAP_USER:", process.env.MAILTRAP_USER);
    console.log("MAILTRAP_PASSWORD:", process.env.MAILTRAP_PASSWORD);
    console.log("DOMAIN:", process.env.DOMAIN);

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    console.log("Transporter created:", transport);

    const mailOptions = {
      from: "m.usman095@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste the link below in your browser. <br> ${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}</p>`,
    };

    console.log("Mail options:", mailOptions);

    const mailresponse = await transport.sendMail(mailOptions);
    console.log(mailresponse);
    return mailresponse;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
