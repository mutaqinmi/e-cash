export default function TableHead(props: {title: string[]}){
    return <tr>
        {props.title.map((items) => {
            return <th key={Math.random()} className="text-center text-gray-400 py-2">{items}</th>
        })}
    </tr>
}