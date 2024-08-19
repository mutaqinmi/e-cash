import * as query from "@/databases/queries";
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';

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

export async function POST(req: NextRequest) {
    try {
        const data = await req.formData();
        const file = data.get('file') as File;
        const product_id = "P-" + Math.random().toString(36).substring(7);
        const product_name = data.get('product_name') as string;
        const stock = data.get('stock') as string;
        const price = data.get('price') as string;
        const category = data.get('category') as string;
        const filename = product_name + "." + file.name.split('.')[1];

        const fileBuffer = Buffer.from(await file!.arrayBuffer());
        await fs.writeFile(`./public/product-image/${filename}`, fileBuffer);
        await query.addProduct(product_id, product_name, parseInt(stock), parseInt(price), category, filename);
        
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

export async function DELETE(req: NextRequest) {
    try {
        const product_id = req.nextUrl.searchParams.get('delete');
        await query.deleteProduct(product_id!);
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