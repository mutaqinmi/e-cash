export default function SegmentedButton(props: {label: string; active: boolean; onClick?: () => void}){
    return <button className={`transition-all ease-in-out py-2 px-4 rounded-lg ${props.active ? 'bg-blue-500 text-white' : 'bg-white text-black'}`} onClick={props.onClick}>{props.label}</button>
}