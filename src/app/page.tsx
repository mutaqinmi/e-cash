'use client'
import SideBar from "@/components/sidebar";
import Cashier from "./cashier";
import { useState } from "react";
import ManageItems from "./manage-items";

export default function Main(){
    const [index, setIndex] = useState(0);
    const body = () => {
        switch (index){
            case 0:
                return <Cashier/>
            case 1:
                return <ManageItems/>;
            case 2:
                return null;
            default:
                return null;
        }
    }

    return <>
        <SideBar index={setIndex}/>
        <div className="pl-28 pt-6 pr-6 w-full flex justify-center">
            <div className="w-4/5">{body()}</div>
        </div>
    </>
}