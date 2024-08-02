export default function InputDate(){
    return <input defaultValue={'2006-08-25'} type="date" name="date" id="date" className="p-2 bg-blue-500 text-white outline-none rounded-xl [&::-webkit-calendar-picker-indicator]:invert-[1]"/>
}