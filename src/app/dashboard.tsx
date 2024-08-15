import CardInfo from "@/components/card-info";
import numberFormatter from "./number-formatter";
import SegmentedButton from "@/components/segmented-button";
import { useState } from "react";
import InputDate from "@/components/input-date";
import { LineChart } from "@/components/line-chart";
import TableHead from "@/components/table-head";
import TableRow from "@/components/table-row";
import Button from "@/components/button";
import OutlinedButton from "@/components/outlined-button";
import DetailTransaction from "@/components/detail-transaction";

export default function Dashboard(){
    const [period, setPeriod] = useState(3);
    const [showDetail, setShowDetail] = useState(false);
    return <>
        <div className="flex justify-between items-center bg-white z-40">
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
            <div className="col-span-1">
                <div className="h-fit p-8 rounded-xl shadow-lg mb-6">
                    <h2 className="text-2xl font-semibold">Hai, Ilham!</h2>
                    <span className="text-sm">Semangat menjalani harimu hari ini!</span>
                </div>
                <div className="h-fit p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-semibold">Laporan</h2>
                    <span className="text-sm">Unduh laporan pendapatan.</span>
                    <Button label="Unduh laporan hari ini" className="mt-8"/>
                    <span className="text-center w-full block my-3 text-sm opacity-50">atau</span>
                    <OutlinedButton label="Unduh berdasarkan waktu"/>
                </div>
            </div>
        </div>
        <div className="mt-6 p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold">Riwayat Transaksi</h2>
            <span className="text-sm">Menampilkan riwayat transaksi berdasarkan rentang waktu.</span>
            <table className="w-full table-auto border-collapse mt-6">
                <thead>
                    <TableHead title={['ID Transaksi', 'Waktu', 'Total Harga']}/>
                </thead>
                <tbody>
                    <TableRow data={['T-1234567', '2021-08-01', 'Rp. 300.000']} onClick={() => setShowDetail(true)}/>
                    <TableRow data={['T-1234567', '2021-08-01', 'Rp. 300.000']} onClick={() => setShowDetail(true)}/>
                    <TableRow data={['T-1234567', '2021-08-01', 'Rp. 300.000']} onClick={() => setShowDetail(true)}/>
                    <TableRow data={['T-1234567', '2021-08-01', 'Rp. 300.000']} onClick={() => setShowDetail(true)}/>
                    <TableRow data={['T-1234567', '2021-08-01', 'Rp. 300.000']} onClick={() => setShowDetail(true)}/>
                    <TableRow data={['T-1234567', '2021-08-01', 'Rp. 300.000']} onClick={() => setShowDetail(true)}/>
                </tbody>
            </table>
        </div>
        <DetailTransaction show={showDetail} setshow={setShowDetail}/>
    </>
}