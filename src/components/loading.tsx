export default function Loading(){
    return <div className="w-screen h-screen absolute bg-black bg-opacity-50 flex justify-center items-center z-50 gap-2">
        <div className="animate-bounce delay-100 h-3 w-3 rounded-full bg-blue-300"></div>
        <div className="animate-bounce delay-200 h-3 w-3 rounded-full bg-blue-300"></div>
        <div className="animate-bounce delay-300 h-3 w-3 rounded-full bg-blue-300"></div>
    </div>
}