import { NextRequest, NextResponse } from "next/server";
const pool = require('@/dbconfig/dbconfig');


export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { token } = body;
        console.log(token);

        const [rows] = await pool.query(
          "SELECT * FROM users WHERE verifyToken = ? AND verifyTokenExpiry > NOW()",
          [token]
        );

        if (rows.length < 0) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }
        console.log(rows);

         await pool.query(
          "UPDATE users SET verifyToken = NULL, verifyTokenExpiry = NULL, isVerified = TRUE WHERE verifyToken = ?",
          [token]
        );

        return NextResponse.json({ message: "Token verified successfully" }, { status: 200 });
        
    } catch (error: any) {
        NextResponse.json({ message: error.message }, { status: 500 });
    }
}