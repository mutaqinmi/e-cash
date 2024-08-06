'use client'
import SideBar from "@/components/sidebar";
import Cashier from "./cashier";
import { useState } from "react";
import ManageItems from "./manage-items";
import Dashboard from "./dashboard";

export default function Main(){
    const [index, setIndex] = useState(0);
    const [expand, setExpand] = useState(false);

    const body = () => {
        switch (index){
            case 0:
                return <Cashier/>
            case 1:
                return <ManageItems/>;
            case 2:
                return <Dashboard/>;
            default:
                return null;
        }
    }

    return <>
        <div className="w-screen h-screen fixed z-50 bg-white flex justify-center items-center sm:hidden">Open in desktop for best experience.</div>
        <SideBar index={setIndex} expand={setExpand} expanded={expand}/>
        <div className={`${expand ?  'pl-80' : 'pl-28'} transition-all ease-in-out duration-300 pt-6 pr-6 w-full flex justify-center`}>
            <div className={expand ? 'w-11/12' : 'w-4/5'}>{body()}</div>
        </div>
    </>
}