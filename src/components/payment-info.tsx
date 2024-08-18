'use client'
import numberFormatter from "@/app/number-formatter";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import Button from "./button";
import axios, { AxiosError } from "axios";

export default function PaymentInfo(props: {total: number; setSuccessDialog: Dispatch<SetStateAction<boolean>>; setCart: Dispatch<SetStateAction<any[]>>; setTotal: Dispatch<SetStateAction<number>>; setLoading: Dispatch<SetStateAction<boolean>>}) {
    const [pay, setPay] = useState('');

    const createTransaction = useCallback(async (data: any[], total: number) => {
        return await axios.post(`${process.env.API_URL}/api/transaction`, {
            data: data,
            total: total,
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${window.localStorage.getItem('token')}`
            }
        })
    }, [])
    
    const counter = () => {
        const totalPayment = parseInt(pay.slice(4).split('.').join(''));
        const totalExchange = totalPayment - props.total;

        if(totalExchange >= 0){
            return numberFormatter(totalExchange.toString());
        }
        
        return '0';
    }

    const transaction = () => {
        props.setLoading(true);
        createTransaction(JSON.parse(window.localStorage.getItem('cart')!), props.total).then((res) => {
            window.localStorage.setItem('cart', JSON.stringify([]));
            props.setCart([]);
            props.setTotal(0);
            props.setSuccessDialog(true);
            props.setLoading(false);
        }).catch((err: AxiosError) => {
            console.log(err);
        })
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
        <Button label="Bayar" className="mt-4" onClick={() => transaction()} disabled={counter() === '0' || pay === '' || pay === 'Rp. ' ? true : false}/>
    </div>
}