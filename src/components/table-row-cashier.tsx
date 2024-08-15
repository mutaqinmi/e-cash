import { Trash } from "@phosphor-icons/react";
import IncrementCounter from "./increment-counter";
import numberFormatter from "@/app/number-formatter";
import { Dispatch, SetStateAction, useState } from "react";

export default function TableRow(props: {id: number, name: string, price: number, quantity?: number, index: number, setCart: Dispatch<SetStateAction<any[]>>}){
    const [qty, setQty] = useState(props.quantity!);

    const removeItem = () => {
        const cart = window.localStorage.getItem('cart');
        const cartList: any[] = JSON.parse(cart!);
        cartList.splice(props.index, 1);
        window.localStorage.setItem('cart', JSON.stringify(cartList));
        props.setCart(cartList);
    }

    const updateItemQty = (qty: number) => {
        const cart = window.localStorage.getItem('cart');
        const cartList: any[] = JSON.parse(cart!);
        cartList[props.index].quantity = qty;
        window.localStorage.setItem('cart', JSON.stringify(cartList));
        props.setCart(cartList);
    }

    return <tr key={props.id}>
        <td className="border-b border-gray-300 text-center py-2">{props.id}</td>
        <td className="border-b border-gray-300 text-center py-2">{props.name}</td>
        <td className="border-b border-gray-300 text-center py-2">{numberFormatter(props.price.toString())}</td>
        <td className="border-b border-gray-300 text-center py-2"><IncrementCounter quantity={qty} setqty={setQty} onUpdateQty={updateItemQty}/></td>
        <td className="border-b border-gray-300 text-center py-2">{numberFormatter((props.price * qty).toString())}</td>
        <td className="border-b border-gray-300 text-center py-2">
            <button className="bg-red-500 hover:bg-red-700 text-white p-2 rounded" onClick={removeItem}><Trash weight="bold"/></button>
        </td>
    </tr>
}