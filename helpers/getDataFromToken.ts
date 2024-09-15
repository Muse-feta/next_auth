import { NextRequest } from "next/server";
import  Jwt  from "jsonwebtoken";

export const getDataFromToken = (req: NextRequest) => {
    try {
            const token = req.cookies.get("token")?.value || "";
            if (!token) {
              return null;
            }
            const data: any = Jwt.verify(token, process.env.JWT_SECRET!);
            return data.id;
    } catch (error: any) {
        throw new Error(error.message);
    }
}