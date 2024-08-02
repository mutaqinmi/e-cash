import React from "react";

export default function IconButton(props: {children: React.ReactNode; active: boolean; onClick?: () => void}){
    return <button className={`p-2 transition ease-in-out rounded-lg ${props.active ? 'bg-blue-500 text-white' : ''}`} onClick={props.onClick}>
        {props.children}
    </button>
}