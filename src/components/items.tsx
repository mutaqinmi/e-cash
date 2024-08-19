import numberFormatter from "@/app/number-formatter";
import { DotsThreeOutlineVertical } from "@phosphor-icons/react";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

export default function Items(props: {id: string; name: string; price: number; stock: number; category: string; image: string; isSearchResult?: boolean; setSearchValue?: Dispatch<SetStateAction<string>>; setCart?: Dispatch<SetStateAction<any[]>>; setTotal?: Dispatch<SetStateAction<number>>}){
    const [showContext, setShowContext] = useState(false);

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

    return <div className="p-4 rounded-lg shadow-md flex gap-4 justify-between relative bg-white select-none" onClick={addToCart}>
        <div className="flex gap-4">
            <div className="w-32 h-32 rounded-md">
                <Image src={`/product-image/${props.image}`} alt={props.name} width={0} height={0} className="w-full h-full bg-cover bg-center" unoptimized/>
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
        {props.isSearchResult ? null : <div className={`w-fit bg-white flex-col absolute top-4 right-12 ${showContext ? 'flex' : 'hidden'}`}>
            <button className="p-2 w-full hover:bg-gray-300 select-none">Edit Barang</button>
            <button className="p-2 w-full hover:bg-gray-300 text-red-500 select-none">Hapus Barang</button>
        </div>}
    </div>
}