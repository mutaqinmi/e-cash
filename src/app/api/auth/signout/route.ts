import { NextRequest, NextResponse } from "next/server";
import * as query from "@/databases/queries";

export async function GET(req: NextRequest) {
    try {
        const token = req.headers.get("Authorization")!;
        await query.signOut(token.split(" ")[1]);
        return NextResponse.json({
            message: "Berhasil logout!"
        }, {
            status: 200
        });
    } catch (error) {
        return NextResponse.json({
            message: "error",
            details: error
        }, {
            status: 500
        });
    }
}