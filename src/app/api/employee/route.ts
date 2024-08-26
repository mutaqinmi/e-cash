import { NextRequest, NextResponse } from "next/server";
import * as query from '@/databases/queries';

export async function GET(req: NextRequest){
    try {
        if(req.nextUrl.searchParams.get('search')){
            const searchQuery = req.nextUrl.searchParams.get('search');
            const employee = await query.searchEmployee(searchQuery!);
            return NextResponse.json({
                data: employee,
            }, {
                status: 200
            })
        }

        if(req.nextUrl.searchParams.get('employee_id')){
            const searchQuery = req.nextUrl.searchParams.get('employee_id');
            const employee = await query.getEmployeeById(parseInt(searchQuery!));
            return NextResponse.json({
                data: employee,
            }, {
                status: 200
            })
        }

        const data = await query.getEmployees();
        return NextResponse.json({
            status: 'success',
            data: data
        }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            status: 'error',
            message: error
        }, {
            status: 500
        })
    }
}

export async function POST(req: NextRequest){
    try {
        const data = await req.json();
        await query.addEmployee(data.type, data.name, data.username, data.password, data.phone);
        return NextResponse.json({
            status: 'success',
        }, {
            status: 201
        })
    } catch (error) {
        return NextResponse.json({
            status: 'error',
            message: error
        }, {
            status: 500
        })
    }
}

export async function DELETE(req: NextRequest){
    try {
        const employee_id = req.nextUrl.searchParams.get('employee_id');
        await query.deleteEmployee(parseInt(employee_id!));
        return NextResponse.json({
            status: 'success',
        }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            status: 'error',
            message: error
        }, {
            status: 500
        })
    }
}

export async function PATCH(req: NextRequest){
    try {
        const employee_id = req.nextUrl.searchParams.get('employee_id');
        const data = await req.json();
        await query.updateEmployee(parseInt(employee_id!), data.type, data.name, data.username, data.password, data.phone);
        return NextResponse.json({
            status: 'success',
        }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            status: 'error',
            message: error
        }, {
            status: 500
        })
    }
}