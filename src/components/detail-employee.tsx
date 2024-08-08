import { DotsThreeOutlineVertical, UserCircle } from "@phosphor-icons/react";
import VDivider from "./v-divider";
import EmployeeStatus from "./employee-status";
import { useState } from "react";

export default function DetailEmployee(){
    const [showContext, setShowContext] = useState(false);

    return <div className="w-full p-8 rounded-lg relative">
        <UserCircle size={60} className="w-full"/>
        <div className="w-full mt-4 text-center">
            <span className="text-sm">12225173</span>
            <h1 className="text-lg font-semibold">Muhammad Ilham Mutaqin</h1>
            <div className="text-sm flex justify-center items-center">
                <span className="mx-2">Admin</span>
                <VDivider/>
                <EmployeeStatus online={true}/>
            </div>
            <DotsThreeOutlineVertical size={20} className="absolute top-8 right-8" onClick={() => setShowContext(!showContext)}/>
            <div className={`w-fit bg-white flex-col absolute top-8 right-16 ${showContext ? 'flex' : 'hidden'}`}>
                <button className="p-2 w-full hover:bg-gray-300 select-none">Edit Petugas</button>
                <button className="p-2 w-full hover:bg-gray-300 text-red-500 select-none">Hapus Petugas</button>
            </div>
        </div>
    </div>
}