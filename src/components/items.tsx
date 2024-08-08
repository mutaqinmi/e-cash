import numberFormatter from "@/app/number-formatter";
import { DotsThreeOutlineVertical, Pencil, Trash } from "@phosphor-icons/react";
import { useState } from "react";

export default function Items(props: {id: string; name: string; price: number; stock: number; category: string}){
    const [showContext, setShowContext] = useState(false);

    return <div className="p-4 rounded-lg shadow-lg flex gap-4 justify-between relative">
        <div className="flex gap-4">
            <div className="bg-gray-400 w-32 h-32 rounded-md"></div>
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
            <DotsThreeOutlineVertical size={20} onClick={() => setShowContext(!showContext)}/>
            <span>Stok: {props.stock}</span>
        </div>
        <div className={`w-fit bg-white flex-col absolute top-4 right-12 ${showContext ? 'flex' : 'hidden'}`}>
            <button className="p-2 w-full hover:bg-gray-300 select-none">Edit Barang</button>
            <button className="p-2 w-full hover:bg-gray-300 text-red-500 select-none">Hapus Barang</button>
        </div>
    </div>
}