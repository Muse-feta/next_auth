const pool = require("@/dbconfig/dbconfig");
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { email, password } = body;
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    // check if user exists
    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Email does not exist" },
        { status: 400 }
      );
    }

    const user = rows[0];
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 400 }
      );
    }

    // create jwt token data
    const tokenData = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    // create jwt token
    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      { message: "User logged in successfully" },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      // maxAge: 24 * 60 * 60,
      // sameSite: "strict",
      // path: "/",
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
