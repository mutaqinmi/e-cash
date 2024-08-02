export default function Button(props: {label: string, onClick?: () => void, className?: string; disabled?: boolean}){
    return <button className={`bg-blue-500 hover:bg-blue-700 w-full p-3 rounded-xl text-white text-sm disabled:bg-blue-200 ${props.className}`} onClick={props.onClick} disabled={props.disabled ? true : false}>{props.label}</button>
}