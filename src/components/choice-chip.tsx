export default function ChoiceChip(props: {label: string; active: boolean; onClick?: () => void}){
    return <button className={`transition-all ease-in-out py-2 w-32 border border-blue-500 rounded-lg ${props.active ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`} onClick={props.onClick}>{props.label}</button>
}