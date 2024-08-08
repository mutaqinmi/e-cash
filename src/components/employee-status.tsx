export default function EmployeeStatus(props: {online: boolean}){
    return <div className="mx-2 flex justify-center items-center gap-2">
        <div className={`w-2 h-2 ${props.online ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></div>
        <span>{props.online ? 'Online' : 'Offline'}</span>
    </div>
}