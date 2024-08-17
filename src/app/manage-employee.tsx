import AddEmployee from "@/components/add-employee";
import Button from "@/components/button";
import DetailEmployee from "@/components/detail-employee";
import Search from "@/components/search";
import TableHead from "@/components/table-head";
import TableRow from "@/components/table-row";
import { useState } from "react";

export default function ManageEmployee(){
    const [showDialog, setShowDialog] = useState(false);
    const [search, setSearch] = useState('');

    return <>
        <Search placeholder="Cari petugas ..." value={search} setvalue={setSearch}/>
        <div className="grid grid-cols-3 gap-6 mt-6">
            <div className="w-full h-fit p-4 col-span-2 rounded-lg shadow-lg">
                <Button label="Tambah Petugas +" className="!w-fit" onClick={() => setShowDialog(true)}/>
                <table className="w-full table-auto border-collapse mt-4">
                    <TableHead title={['ID', 'Jenis', 'Username', 'Nama']}/>
                    <TableRow data={['12225173', 'Admin', 'Ilham', 'Muhammad Ilham Mutaqin']}/>
                    <TableRow data={['12225173', 'Admin', 'Ilham', 'Muhammad Ilham Mutaqin']}/>
                    <TableRow data={['12225173', 'Admin', 'Ilham', 'Muhammad Ilham Mutaqin']}/>
                    <TableRow data={['12225173', 'Admin', 'Ilham', 'Muhammad Ilham Mutaqin']}/>
                    <TableRow data={['12225173', 'Admin', 'Ilham', 'Muhammad Ilham Mutaqin']}/>
                </table>
            </div>
            <div className="w-full h-fit col-span-1 shadow-lg">
                <DetailEmployee/>
            </div>
            {
                showDialog ?
                <div className="bg-gray-500 bg-opacity-50 w-screen h-screen fixed top-0 left-0 z-50 flex justify-center items-center">
                    <AddEmployee setshow={setShowDialog}/>
                </div> : null
            }
        </div>
    </>
}