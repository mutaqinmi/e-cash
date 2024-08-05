import CardInfo from "@/components/card-info";
import numberFormatter from "./number-formatter";
import SegmentedButton from "@/components/segmented-button";
import { useState } from "react";
import InputDate from "@/components/input-date";
import { LineChart } from "@/components/line-chart";
import { PieCharts } from "@/components/pie-chart";
import TableHead from "@/components/table-head";
import TableRow from "@/components/table-row";

export default function Dashboard(){
    const [period, setPeriod] = useState(3);
    return <>
        <div className="flex justify-between items-center sticky top-0 bg-white py-4 z-50">
            <div>
                <SegmentedButton label="6 bulan" active={period === 0 ? true : false} onClick={() => {setPeriod(0)}}/>
                <SegmentedButton label="1 bulan" active={period === 1 ? true : false} onClick={() => {setPeriod(1)}}/>
                <SegmentedButton label="7 hari" active={period === 2 ? true : false} onClick={() => {setPeriod(2)}}/>
                <SegmentedButton label="24 jam" active={period === 3 ? true : false} onClick={() => {setPeriod(3)}}/>
            </div>
            <InputDate/>
        </div>
        <div className="flex gap-6 mt-6">
            <CardInfo title="Laba Bersih" total={numberFormatter('300000')}/>
            <CardInfo title="Laba Kotor" total={numberFormatter('300000')}/>
            <CardInfo title="Total Kerugian" total={numberFormatter('300000')}/>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-6">
            <LineChart/>
            {/* <PieCharts/> */}
            <div className="bg-red-500 h-72 col-span-1 p-4 rounded-xl shadow-lg"></div>
        </div>
        <div className="mt-6 p-8 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold">Riwayat Transaksi</h2>
            <span className="text-sm">Menampilkan riwayat transaksi berdasarkan rentang waktu.</span>
            <table className="w-full table-auto border-collapse mt-6">
                <TableHead title={['ID Transaksi', 'Tanggal', 'Total Harga']}/>
                <TableRow data={['T-1234567', '2021-08-01', 'Rp. 300.000']}/>
                <TableRow data={['T-1234567', '2021-08-01', 'Rp. 300.000']}/>
                <TableRow data={['T-1234567', '2021-08-01', 'Rp. 300.000']}/>
                <TableRow data={['T-1234567', '2021-08-01', 'Rp. 300.000']}/>
                <TableRow data={['T-1234567', '2021-08-01', 'Rp. 300.000']}/>
                <TableRow data={['T-1234567', '2021-08-01', 'Rp. 300.000']}/>
            </table>
        </div>
    </>
}