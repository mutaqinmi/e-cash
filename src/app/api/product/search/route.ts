import { NextRequest, NextResponse } from "next/server";
import * as query from "@/databases/queries";

export async function GET(req: NextRequest){
    try {
        const searchQuery = req.nextUrl.searchParams.get('query');
        const product = await query.searchProduct(searchQuery!);
        return NextResponse.json({
            data: product,
        }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: "error",
            details: error
        }, {
            status: 400
        })
    }
}