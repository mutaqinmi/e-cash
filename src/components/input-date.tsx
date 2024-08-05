export default function InputDate(){
    return <input type="date" name="date" id="date" className="p-2 bg-blue-500 text-white outline-none rounded-xl [&::-webkit-calendar-picker-indicator]:invert-[1]" onChange={(e) => {console.log(e.currentTarget.value)}}/>
}