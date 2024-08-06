import { X } from "@phosphor-icons/react";
import TableHead from "./table-head";
import TableRow from "./table-row";
import { Dispatch, SetStateAction } from "react";
import numberFormatter from "@/app/number-formatter";
import Button from "./button";

export default function DetailTransaction(props: {show: boolean; setshow: Dispatch<SetStateAction<boolean>>}) {
    return <div className={`h-screen w-screen fixed top-0 left-0 z-50 bg-gray-500 bg-opacity-50 gap-2 justify-center items-center ${props.show ? 'flex' : 'hidden'}`}>
        <div className="w-96 h-96 p-4 bg-white rounded-xl overflow-auto">
            <table className="w-full table-auto border-collapse">
                <TableHead title={['Nama Produk', 'Jumlah', 'Total']}/>
                <TableRow data={['Produk 1', '10', 'Rp. 300.000']} detailed/>
                <TableRow data={['Produk 1', '10', 'Rp. 300.000']} detailed/>
                <TableRow data={['Produk 1', '10', 'Rp. 300.000']} detailed/>
            </table>
        </div>
        <div className="w-80 h-96 p-4 bg-white rounded-xl relative flex flex-col justify-between">
            <X className="absolute top-5 right-5" onClick={() => {props.setshow(false)}}/>
            <div>
                <h2 className="text-2xl font-semibold">Detail Transaksi</h2>
                <span className="text-sm">Menampilkan detail transaksi yang dipilih.</span>
                <div className="mt-5">
                    <span className="block text-sm text-gray-400">ID Transaksi</span>
                    <span className="block">T - 1234 5678</span>
                </div>
                <div className="mt-5">
                    <span className="block text-sm text-gray-400">Waktu</span>
                    <span className="block">2021-8-01</span>
                </div>
                <div className="mt-5">
                    <span className="block text-sm text-gray-400">Jumlah</span>
                    <span className="block">{numberFormatter('300000')}</span>
                </div>
            </div>
            <Button label="Cetak Struk"/>
        </div>
    </div>
}