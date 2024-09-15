import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
const pool = require("@/dbconfig/dbconfig");


export const GET = async (req: NextRequest) => {
    try {
        const userId = await getDataFromToken(req)

        const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [userId])
        
        return NextResponse.json({ data: rows[0] }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}