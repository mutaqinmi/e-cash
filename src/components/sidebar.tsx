'use client'
import { Basket, ChartBar, Package, SignOut, UserCircle } from "@phosphor-icons/react";
import IconButton from "./icon-button";
import HDivider from "./h-divider";
import { Dispatch, SetStateAction, useState } from "react";

export default function SideBar(props: {index: Dispatch<SetStateAction<number>>}) {
    const [index, setIndex] = useState(0);

    return <div className="fixed top-6 bottom-6 left-6 w-16 shadow-lg rounded-xl py-4 flex flex-col items-center justify-between">
        <div className="flex flex-col items-center gap-4">
            <IconButton active={false}><UserCircle size={28}/></IconButton>
            <HDivider/>
            <IconButton active={index === 0 ? true : false} onClick={() => {setIndex(0); props.index(0)}}><Basket size={28}/></IconButton>
            <IconButton active={index === 1 ? true : false} onClick={() => {setIndex(1); props.index(1)}}><Package size={28}/></IconButton>
            <IconButton active={index === 2 ? true : false} onClick={() => {setIndex(2); props.index(2)}}><ChartBar size={28}/></IconButton>
        </div>
        <IconButton active={false}><SignOut size={28}/></IconButton>
    </div>
}