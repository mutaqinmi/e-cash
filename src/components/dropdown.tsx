import { CaretDown } from "@phosphor-icons/react";
import { Dispatch, SetStateAction, useState } from "react";

export default function DropDown(props: {label: string, items: string[]; value: Dispatch<SetStateAction<string>>}) {
    const [isOpen, setIsOpen] = useState(false);
    return <div className="relative select-none">
        <div className="py-3 px-4 border border-black rounded-lg" onClick={() => setIsOpen(!isOpen)}>{props.label}</div>
        <CaretDown weight="bold" className="absolute top-1/2 -translate-y-1/2 right-4"/>
        {isOpen ? <div className="w-full h-28 overflow-auto absolute flex-col z-50">
            {
                props.items.map((item) => {
                    return <div className="py-3 px-4 w-full bg-white hover:bg-gray-300" onClick={() => {props.value(item); setIsOpen(false)}}>{item}</div>
                })
            }
        </div> : null}
    </div>
}