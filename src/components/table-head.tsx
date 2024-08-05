export default function TableHead(props: {title: string[]}){
    return <thead>
        <tr>
            {props.title.map((items) => {
                return <th className="text-center text-gray-400 py-2" colSpan={items.includes("Nama") ? 2 : 1}>{items}</th>
            })}
        </tr>
    </thead>
}