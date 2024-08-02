'use client'
import numberFormatter from "@/app/number-formatter";
import { useState } from "react";
import Button from "./button";

export default function PaymentInfo(props: {total: number}){
    const [pay, setPay] = useState('');
    const counter = () => {
        const totalPayment = parseInt(pay.slice(4).split('.').join(''));
        const totalExchange = totalPayment - props.total;

        if(totalExchange >= 0){
            return numberFormatter(totalExchange.toString());
        }
        
        return '0';
    }

    return <div>
        <div className="flex justify-center items-center flex-col">
            <label htmlFor="bayar" className="text-sm">Jumlah Bayar</label>
            <input type="text" name="bayar" id="bayar" className="outline-none w-full text-center p-4 text-2xl font-semibold" placeholder="Rp. 000.000.000" onChange={(e) => {setPay(numberFormatter(e.currentTarget.value))}} value={pay}/>
        </div>
        <div className="flex justify-between mt-6">
            <div className="flex flex-col">
                <span className="text-sm">Total</span>
                <span className="text-xl font-semibold">{numberFormatter(props.total.toString())}</span>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-sm">Total Kembalian</span>
                <span className="text-xl font-semibold">{counter()}</span>
            </div>
        </div>
        <Button label="Bayar" className="mt-4" disabled={counter() === '0' || pay === '' || pay === 'Rp. ' ? true : false}/>
    </div>
}