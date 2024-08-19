import * as query from "@/databases/queries";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        if(req.nextUrl.searchParams.get('category')){
            const category = req.nextUrl.searchParams.get('category');
            const products = await query.getProductsByCategory(category!);
            return NextResponse.json({
                data: products,
            }, {
                status: 200
            })
        }

        if(req.nextUrl.searchParams.get('search')){
            const searchQuery = req.nextUrl.searchParams.get('search');
            const product = await query.searchProduct(searchQuery!);
            return NextResponse.json({
                data: product,
            }, {
                status: 200
            })
        }

        const data = await query.getProducts();
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