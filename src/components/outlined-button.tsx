import React from "react";

export default function OutlinedButton(props: {label?: string, icon?: React.ReactNode; onClick?: () => void, className?: string; disabled?: boolean}){
    return <button className={`border border-blue-500 hover:bg-blue-500 w-full p-3 rounded-xl text-blue-500 hover:text-white text-sm disabled:border-blue-200 ${props.className}`} onClick={props.onClick} disabled={props.disabled ? true : false}>{props.label || props.icon}</button>
}