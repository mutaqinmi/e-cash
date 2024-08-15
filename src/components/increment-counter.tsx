import { Minus, Plus } from "@phosphor-icons/react";
import { Dispatch, SetStateAction } from "react";

export default function IncrementCounter(props: {quantity: number; setqty: Dispatch<SetStateAction<number>>; onUpdateQty: (qty: number) => void}){
    const handleIncrement = () => {
        const qty = props.quantity + 1;
        props.setqty(qty);
        props.onUpdateQty(qty);
    }

    const handleDecrement = () => {
        if(props.quantity > 0){
            const qty = props.quantity - 1;
            props.setqty(qty);
            props.onUpdateQty(qty);
        }
    }

    return <div className="flex justify-center items-center">
        <button className="p-1 bg-blue-500 rounded-full text-white disabled:bg-blue-200" onClick={() => handleDecrement()} disabled={props.quantity < 1 ? true : false}><Minus weight="bold" size={8}/></button>
        <span className="px-2">{props.quantity}</span>
        <button className="p-1 bg-blue-500 rounded-full text-white" onClick={() => handleIncrement()}><Plus weight="bold" size={8}/></button>
    </div>
}