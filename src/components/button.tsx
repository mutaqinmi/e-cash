import React from "react";

export default function Button(props: {label?: string, icon?: React.ReactNode; onClick?: () => void, className?: string; disabled?: boolean;}){
    return <button className={`bg-blue-500 hover:bg-blue-700 w-full p-3 rounded-xl text-white text-sm disabled:bg-blue-300 ${props.className}`} onClick={props.onClick} disabled={props.disabled ? true : false}>{props.label || props.icon}</button>
}