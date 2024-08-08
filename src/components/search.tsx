'use client'
import { MagnifyingGlass } from "@phosphor-icons/react";

export default function Search(props: {placeholder: string}){
    return <div className="relative">
        <input type="text" className="w-full border-[1px] border-slate-400 py-3 pl-6 pr-16 rounded-full outline-none" placeholder={props.placeholder}/>
        <MagnifyingGlass size={20} className="absolute top-1/2 -translate-y-1/2 right-6"/>
    </div>
}