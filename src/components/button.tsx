import React from "react";

export default function Button(props: {label?: string, icon?: React.ReactNode; onClick?: () => void, className?: string; disabled?: boolean; isForm?: boolean}){
    return <button className={`bg-blue-500 hover:bg-blue-700 w-full p-3 rounded-xl text-white text-sm disabled:bg-blue-300 ${props.className}`} onClick={props.onClick} disabled={props.disabled ? true : false} type={props.isForm ? "submit" : "button"}>{props.label || props.icon}</button>
}