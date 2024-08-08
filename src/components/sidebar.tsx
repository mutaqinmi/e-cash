'use client'
import { Basket, CaretLeft, CaretRight, ChartBar, Package, SignOut, UserList, UserCircle } from "@phosphor-icons/react";
import IconButton from "./icon-button";
import HDivider from "./h-divider";
import { Dispatch, SetStateAction, useState } from "react";

export default function SideBar(props: {index: Dispatch<SetStateAction<number>>; expand: Dispatch<SetStateAction<boolean>>; expanded: boolean}) {
    const [index, setIndex] = useState(0);

    return <div className={`transition-all ease-in-out duration-200 bg-white fixed top-6 bottom-6 left-6 rounded-xl shadow-lg py-4 px-4 flex flex-col justify-between z-40 ${props.expanded ? 'w-60 items-start' : 'w-fit items-center'}`}>
        <div className="absolute top-1/2 -translate-y-1/2 -right-10 px-2 py-6 bg-white rounded-lg shadow-lg" onClick={() => {props.expanded ? props.expand(false) : props.expand(true)}}>{props.expanded ? <CaretLeft weight={'bold'}/> : <CaretRight weight={'bold'}/>}</div>
        <div className="flex flex-col items-center gap-4 w-full">
            <IconButton className={`${props.expanded ? 'justify-between' : 'justify-center'}`} active={false} onClick={() => {}}><div className="flex justify-center items-center"><UserCircle size={28}/><span className={`ml-4 ${props.expanded ? 'flex' : 'hidden'}`}></span></div></IconButton>
            <HDivider/>
            <IconButton className={`${props.expanded ? 'justify-between' : 'justify-center'}`} active={index === 0 ? true : false} onClick={() => {setIndex(0); props.index(0)}}><div className="flex justify-center items-center"><Basket size={28}/><span className={`ml-4 ${props.expanded ? 'flex' : 'hidden'}`}>Kasir</span></div><CaretRight weight="bold" size={14} className={props.expanded && index === 0 ? 'flex' : 'hidden'}/></IconButton>
            <IconButton className={`${props.expanded ? 'justify-between' : 'justify-center'}`} active={index === 1 ? true : false} onClick={() => {setIndex(1); props.index(1)}}><div className="flex justify-center items-center"><Package size={28}/><span className={`ml-4 ${props.expanded ? 'flex' : 'hidden'}`}>Produk</span></div><CaretRight weight="bold" size={14} className={props.expanded && index === 1 ? 'flex' : 'hidden'}/></IconButton>
            <IconButton className={`${props.expanded ? 'justify-between' : 'justify-center'}`} active={index === 2 ? true : false} onClick={() => {setIndex(2); props.index(2)}}><div className="flex justify-center items-center"><ChartBar size={28}/><span className={`ml-4 ${props.expanded ? 'flex' : 'hidden'}`}>Dashboard</span></div><CaretRight weight="bold" size={14} className={props.expanded && index === 2 ? 'flex' : 'hidden'}/></IconButton>
            <IconButton className={`${props.expanded ? 'justify-between' : 'justify-center'}`} active={index === 3 ? true : false} onClick={() => {setIndex(3); props.index(3)}}><div className="flex justify-center items-center"><UserList size={28}/><span className={`ml-4 ${props.expanded ? 'flex' : 'hidden'}`}>Petugas</span></div><CaretRight weight="bold" size={14} className={props.expanded && index === 3 ? 'flex' : 'hidden'}/></IconButton>
        </div>
        <IconButton className={`${props.expanded ? 'justify-between' : 'justify-center'}`} active={false} onClick={() => {}}><div className="flex justify-center items-center"><SignOut size={28}/><span className={`ml-4 ${props.expanded ? 'flex' : 'hidden'}`}>Keluar</span></div><CaretRight weight="bold" size={14} className={props.expanded ? 'flex' : 'hidden'}/></IconButton>
    </div>
}