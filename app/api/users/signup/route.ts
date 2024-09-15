const pool = require("@/dbconfig/dbconfig");
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { username, email, password } = body;
    
    // check if user exists
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length > 0) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    // hash password
    const salt = await bcryptjs.genSalt(10); // Added await here
    const hashedPassword = await bcryptjs.hash(password, salt);

    // create user
    const [results] = await pool.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    // send verification email
    await sendEmail({
      email: email,
      emailType: "VERIFY",
      userId: results.insertId,
    });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
