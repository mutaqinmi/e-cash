'use client'
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function InputText(props: {label: string; value: Dispatch<SetStateAction<string>>; initialValue?: string}) {
    const [focus, setFocus] = useState(false);
    const [value, setValue] = useState(props.initialValue ? props.initialValue : '');

    useEffect(() => {
        setValue(props.initialValue ? props.initialValue : '');
    }, [])

    return <div className="relative my-4">
        <label htmlFor={props.label} className={`transition-all ease-in-out bg-white mx-2 absolute -translate-y-1/2 px-2 focus:hidden ${focus ? 'text-sm top-0' : 'text-md top-1/2'}`}>{props.label}</label>
        <input type="text" id={props.label} className="w-full bg-white border-[1.5px] border-black outline-none p-3 rounded-lg" onFocus={() => {setFocus(true)}} onBlur={() => {setFocus(false); if(value != '') setFocus(true)}} value={value} onChange={(event) => {setValue(event.currentTarget.value); props.value(event.currentTarget.value)}} autoFocus={props.initialValue ? true : false}/>
    </div>
}