import { Trash } from "@phosphor-icons/react";
import IncrementCounter from "./increment-counter";
import numberFormatter from "@/app/number-formatter";
import { useState } from "react";

export default function TableRow(props: {id: number, name: string, price: number, quantity?: number, total: number}){
    const [qty, setQty] = useState(1);
    return <tr>
        <td className="border-b border-gray-300 text-center py-2">{props.id}</td>
        <td className="border-b border-gray-300 text-center py-2">{props.name}</td>
        <td className="border-b border-gray-300 text-center py-2">{numberFormatter(props.price.toString())}</td>
        <td className="border-b border-gray-300 text-center py-2"><IncrementCounter quantity={qty} setqty={setQty}/></td>
        <td className="border-b border-gray-300 text-center py-2">{numberFormatter(props.total.toString())}</td>
        <td className="border-b border-gray-300 text-center py-2">
            <button className="bg-red-500 hover:bg-red-700 text-white p-2 rounded"><Trash weight="bold"/></button>
        </td>
    </tr>
}