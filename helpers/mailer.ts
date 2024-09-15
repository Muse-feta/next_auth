import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs"
const pool = require("@/dbconfig/dbconfig");

export const sendEmail = async ({email, emailType, userId}: any) => {
    try {
        console.log(email, emailType, userId)
        // create a hash for the password
        const hashPassword = await bcryptjs.hash(userId.toString(), 10)
        
    if (emailType === "VERIFY") {
      try {
        await pool.query(
          "UPDATE users SET verifyToken = ?, verifyTokenExpiry = ? WHERE id = ?",
          [hashPassword, Date.now() + 3600000, userId]
        );
        console.log("User verification token updated successfully");
      } catch (err) {
        console.error("Error updating user verification token", err);
      }       
    } else if (emailType === "RESET") {
      await pool.query(
        "UPDATE users SET forgotPasswordToken = ?, forgotPasswordTokenExpiry = ? WHERE id = ?",
        [hashPassword, Date.now() + 3600000, userId]
      );
    }

        var transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "c8128bb0e1f906",
            pass: "e69c8bef473220",
          },
        });

        const mailOptions = {
            from: "muse@example.com",
            to: email,
            subject: `${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}`,
            html: `${emailType === "VERIFY" ? `<a href="http://localhost:3000/verify?token=${hashPassword}">Verify Email</a>` : `<a href="http://localhost:3000/reset-password?token=${hashPassword}">Reset Password</a>`}`,
        }

        const info = await transport.sendMail(mailOptions)
        return info
    } catch (error: any) {
        throw new Error(error.message)
    }
}