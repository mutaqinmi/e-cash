import { CaretDoubleUp } from "@phosphor-icons/react";

export default function CardInfo(props: {title: string; total: string}) {
    return <div className="p-4 h-36 w-full shadow-lg rounded-xl flex flex-col justify-between">
        <div className="flex justify-between">
            <span>{props.title}</span>
            <div className="flex justify-center items-center gap-1">
                <CaretDoubleUp weight="bold" className="text-green-500"/>
                <span className="text-green-500 text-xl font-semibold">+7.68%</span>
            </div>
        </div>
        <span className="text-3xl font-semibold">{props.total}</span>
    </div>
}