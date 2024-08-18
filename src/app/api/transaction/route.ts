import { NextRequest, NextResponse } from 'next/server';
import * as query from '@/databases/queries';
import * as luxon from 'luxon';

async function verifyToken(token: string){
    try {
        const data = await query.getToken(token);
        if(data.length === 0){
            return false;
        }

        return data;
    } catch (error) {
        return error
    }
}

export async function POST(req: NextRequest){
    try {
        const access_token = req.headers.get('Authorization')!.split(' ')[1];

        if(!access_token) {
            return NextResponse.json({
                message: "Unauthorized",
            }, {
                status: 401
            })
        }

        if(!await verifyToken(access_token)){
            return NextResponse.json({
                message: "Unauthorized",
            }, {
                status: 401
            })
        }

        const data = await req.json();
        const token = await verifyToken(access_token);
        const employee_id = (token as any)[0].employee_id;
        const transaction_id = "T-" + luxon.DateTime.now().toISODate().split('-').join('') + "-" + Math.random().toString(36).substring(2, 15);
        const transaction = await query.createTransaction(transaction_id, employee_id, data.total);
        for(let i = 0; i < data.data.length; i++){
            await query.createDetailTransaction(transaction[0].transaction_id, data.data[i].product_id, data.data[i].quantity, data.data[i].price * data.data[i].quantity);
        }

        return NextResponse.json({
            message: "success",
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