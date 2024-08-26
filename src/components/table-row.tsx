import { CaretRight } from "@phosphor-icons/react"

export default function TableRow(props: {data: string[]; detailed?: boolean; onClick?: () => void}){
    return <tr key={props.data[0]} className="cursor-pointer" onClick={props.onClick}>
        {props.data.map((items) => {
            return <td className="border-b border-gray-300 text-center py-2">{items}</td>
        })}
        {props.detailed ? null : <td><CaretRight/></td>}
    </tr>
}