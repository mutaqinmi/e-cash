import PaymentInfo from "@/components/payment-info";
import Search from "@/components/search";
import TableHead from "@/components/table-head";
import TableRow from "@/components/table-row";

export default function Cashier(){
    return <>
        <Search/>
        <div className="grid grid-cols-3 gap-6 mt-6">
            <div className="w-full h-fit p-4 col-span-2 rounded-lg shadow-lg">
                <div className="mt-4">
                    <table className="w-full table-auto border-collapse">
                        <TableHead/>
                        <tbody>
                            <TableRow id={1} name="Kopi" price={10000} total={20000}/>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="w-full p-4 col-span-1 rounded-lg shadow-lg h-fit">
                <PaymentInfo total={300000}/>
            </div>
        </div>
    </>
}