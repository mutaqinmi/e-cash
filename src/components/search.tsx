'use client'
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Dispatch, SetStateAction } from "react";

export default function Search(props: {placeholder: string; value: string; setvalue: Dispatch<SetStateAction<string>>; onChange?: (search: string) => void;}){
    return <div className="relative">
        <input type="text" className="w-full border-[1px] border-slate-400 py-3 pl-6 pr-16 rounded-full outline-none" placeholder={props.placeholder} value={props.value} onChange={(e) => {props.setvalue(e.currentTarget.value); props.onChange!(props.value)}} onKeyUp={(e) => {props.setvalue(e.currentTarget.value); props.onChange!(props.value)}}/>
        <MagnifyingGlass size={20} className="absolute top-1/2 -translate-y-1/2 right-6"/>
    </div>
}