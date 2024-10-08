import numberFormatter from "@/app/number-formatter";
import { DotsThreeOutlineVertical } from "@phosphor-icons/react";
import axios from "axios";
import Image from "next/image";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import UploadItems from "./upload-item";
import UpdateItems from "./update-item";

export default function Items(props: {id: string; name: string; price: number; stock: number; category: string; image: string; isSearchResult?: boolean; setSearchValue?: Dispatch<SetStateAction<string>>; setCart?: Dispatch<SetStateAction<any[]>>; setTotal?: Dispatch<SetStateAction<number>>; setProductList?: Dispatch<SetStateAction<any[]>>}) {
    const [showContext, setShowContext] = useState(false);
    const [showUploadDialog, setShowUploadDialog] = useState(false);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);

    const addToCart = () => {
        if(!props.isSearchResult) return;
        const cart = window.localStorage.getItem('cart');
        const cartList: any[] = JSON.parse(cart!);
        cartList.push({
            product_id: props.id,
            product_name: props.name,
            price: props.price,
            quantity: 1
        });
        window.localStorage.setItem('cart', JSON.stringify(cartList));
        props.setCart!(cartList);
        props.setSearchValue!('');
        props.setTotal!(cartList.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0));
    }

    const deleteProduct = useCallback(async (product_id: string) => {
        return await axios.delete(`${process.env.API_URL}/api/product?delete=${product_id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
    }, [])

    const products = useCallback(async () => {
        return await axios.get(`${process.env.API_URL}/api/product`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
    }, []);

    const deleteProductHandler = (product_id: string) => {
        if(props.isSearchResult) return;
        const confirmDelete = confirm('Apakah anda yakin ingin menghapus barang ini?');
        if(!confirmDelete) return;
        deleteProduct(product_id).then((res) => {
            products().then((res) => {
                props.setProductList!(res.data.data);
            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    return <div className="p-4 rounded-lg shadow-md flex gap-4 justify-between relative bg-white select-none" onClick={addToCart}>
        <div className="flex gap-4">
            <div className="w-32 h-32 rounded-md">
                <Image src={`/product-image/${props.image}`} alt={props.name} width={0} height={0} className="w-full h-full object-cover bg-cover bg-center" unoptimized/>
            </div>
            <div className="flex flex-col justify-between">
                <div>
                    <span className="text-sm text-gray-400">{props.id}</span>
                    <h2 className="text-xl font-semibold">{props.name}</h2>
                    <span className="text-sm text-gray-400">{props.category}</span>
                </div>
                <span className="text-lg font-medium">{numberFormatter(props.price.toString())}</span>
            </div>
        </div>
        <div className="flex flex-col items-end justify-between">
            {props.isSearchResult ? <div></div> : <DotsThreeOutlineVertical size={20} onClick={() => setShowContext(!showContext)}/>}
            <span>Stok: {props.stock}</span>
        </div>
        {props.isSearchResult ? null : <div className={`w-fit bg-white flex-col absolute top-4 right-12 text-sm ${showContext ? 'flex' : 'hidden'}`}>
            <button className="p-2 w-full hover:bg-gray-300 select-none" onClick={() => {setShowUploadDialog(true); setShowContext(false)}}>Ubah Gambar</button>
            <button className="p-2 w-full hover:bg-gray-300 select-none" onClick={() => {setShowUpdateDialog(true); setShowContext(false)}}>Edit Barang</button>
            <button className="p-2 w-full hover:bg-gray-300 text-red-500 select-none" onClick={() => {deleteProductHandler(props.id); setShowContext(false)}}>Hapus Barang</button>
        </div>}
        {showUploadDialog ? <UploadItems id={props.id} image={props.image} setShow={setShowUploadDialog} setProductList={props.setProductList!}/> : null}
        {showUpdateDialog ? <UpdateItems id={props.id} name={props.name} stock={props.stock.toString()} price={props.price.toString()} category={props.category} setShow={setShowUpdateDialog} setProductList={props.setProductList!}/> : null}
    </div>
}