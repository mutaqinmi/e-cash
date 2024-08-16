'use client'
import SideBar from "@/components/sidebar";
import Cashier from "./cashier";
import { useEffect, useState } from "react";
import ManageItems from "./manage-items";
import Dashboard from "./dashboard";
import ManageEmployee from "./manage-employee";
import { useRouter } from "next/navigation";
import { isUserLoggedIn } from "@/utils/auth";
import Loading from "@/components/loading";

export default function Main(){
    const route = useRouter();
    const [index, setIndex] = useState(0);
    const [expand, setExpand] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if(!isUserLoggedIn()){
            setIsLoggedIn(false);
            return route.replace('/signin');
        }
        setIsLoggedIn(true);
    }, [])
    
    const body = () => {
        switch (index){
            case 0:
                return <Cashier/>
            case 1:
                return <ManageItems/>;
            case 2:
                return <Dashboard/>;
            case 3:
                return <ManageEmployee/>
            default:
                return null;
        }
    }

    return isLoggedIn ? <div>
        {loading ? <Loading/> : null}
        <div className="w-screen h-screen fixed z-50 bg-white flex justify-center items-center sm:hidden">Open in desktop for best experience.</div>
        <SideBar index={setIndex} expand={setExpand} expanded={expand} loading={setLoading}/>
        <div className={`${expand ?  'pl-80' : 'pl-28'} transition-all ease-in-out duration-300 pt-6 pr-6 w-full flex justify-center`}>
            <div className={expand ? 'w-11/12' : 'w-4/5'}>{body()}</div>
        </div>
    </div> : null;
}