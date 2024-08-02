'use client'
import { Dispatch, SetStateAction, useState } from "react";
import { Eye, EyeSlash } from '@phosphor-icons/react';

export default function InputPassword(props: {label: string, value: Dispatch<SetStateAction<string>>}){
    const [focus, setFocus] = useState(false);
    const [type, setType] = useState('password');
    const [value, setValue] = useState('');

    return <div className="relative my-4">
        <label htmlFor={props.label} className={`transition-all ease-in-out bg-white mx-2 absolute -translate-y-1/2 px-2 focus:hidden ${focus ? 'text-sm top-0' : 'text-md top-1/2'}`}>{props.label}</label>
        <input type={type} id={props.label} className="w-full bg-white border-[1.5px] border-black outline-none p-3 rounded-lg" onFocus={() => {setFocus(true)}} onBlur={() => {setFocus(false); if(value != '') setFocus(true)}} value={value} onChange={(event) => {setValue(event.currentTarget.value); props.value(event.currentTarget.value)}}/>
        {type === 'password' ? <EyeSlash className="absolute top-1/2 -translate-y-1/2 right-4" onClick={() => {setType('text')}}/> : <Eye className="absolute top-1/2 -translate-y-1/2 right-4" onClick={() => {setType('password')}}/>}
    </div>
}