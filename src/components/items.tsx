import numberFormatter from "@/app/number-formatter";
import { Pencil, Trash } from "@phosphor-icons/react";

export default function Items(props: {id: string; name: string; price: number; stock: number; category: string}){
    return <div className="p-4 rounded-lg shadow-lg flex gap-4 justify-between">
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
            <div className="flex gap-2">
                <button className="p-2 text-white rounded-lg bg-blue-500 hover:bg-blue-700"><Pencil size={20}/></button>
                <button className="p-2 text-white rounded-lg bg-red-500 hover:bg-red-700"><Trash size={20}/></button>
            </div>
            <span>Stok: {props.stock}</span>
        </div>
    </div>
}