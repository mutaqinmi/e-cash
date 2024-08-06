import React from "react";

export default function IconButton(props: {children: React.ReactNode; active: boolean; onClick?: () => void; className?: string}) {
    return <button className={`p-2 transition ease-in-out rounded-lg w-full flex  items-center ${props.active ? 'bg-blue-500 text-white' : ''} ${props.className}`} onClick={props.onClick}>
        {props.children}
    </button>
}