import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import * as query from "@/databases/queries";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const employee = await query.getEmployee(data.username);
        
        if(employee.length === 0) {
            return NextResponse.json({
                message: "Username tidak ditemukan!",
            }, {
                status: 400
            })
        }
        
        if(employee[0].password !== data.password) {
            return NextResponse.json({
                message: "Password salah!",
            }, {
                status: 400
            })
        }
        
        const { employee_id, username, password, status, ...payloads } = employee[0];
        const token = jwt.sign(payloads, process.env.SECRET_KEY!, {expiresIn: "1d"});
        await query.signIn(token, employee_id);
        
        return NextResponse.json({
            data: payloads,
            token: token,
        }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: "error",
            details: error
        }, {
            status: 500
        })
    }
}