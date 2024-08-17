import Button from "@/components/button";
import OutlinedButton from "@/components/outlined-button";
import { CheckCircle } from "@phosphor-icons/react";
import { Dispatch, SetStateAction } from "react";

export default function PaymentSuccessfulDialog(props: {setShowSuccessDialog: Dispatch<SetStateAction<boolean>>}) {
    return <div className="fixed w-screen h-screen bg-black left-0 top-0 z-50 bg-opacity-50 flex justify-center items-center">
        <div className="w-80 p-4 bg-white rounded-lg relative flex flex-col items-center gap-8">
            <CheckCircle size={50} className="mt-8 text-green-500"/>
            <div className="text-center">
                <h1 className="text-2xl font-semibold">Transaksi Berhasil!</h1>
                <p className="text-sm text-gray-500">Periksa kembali uang pelanggan dan sesuaikan dengan jumlah transaksi.</p>
            </div>
            <div className="w-full flex flex-col gap-2">
                <Button label="Cetak Struk"/>
                <OutlinedButton label="Tutup" onClick={() => props.setShowSuccessDialog(false)}/>
            </div>
        </div>
    </div>
}