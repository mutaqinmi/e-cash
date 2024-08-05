import { CaretRight } from "@phosphor-icons/react"

export default function TableRow(props: {data: string[]}){
    return <tbody>
        <tr>
            {props.data.map((items) => {
                return <td className="border-b border-gray-300 text-center py-2">{items}</td>
            })}
            <td><CaretRight/></td>
        </tr>
    </tbody>
}