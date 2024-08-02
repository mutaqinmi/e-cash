import { Dispatch, SetStateAction, useState } from "react";
import InputText from "./input-text";
import { CloudArrowUp, X } from "@phosphor-icons/react";
import Button from "./button";

export default function AddItems(props: {show: boolean; setShow: Dispatch<SetStateAction<boolean>>}){
    const [name, setName] = useState('');
    const [stock, setStock] = useState('');
    const [price, setPrice] = useState('');

    return <div className={`w-screen h-screen bg-gray-500 bg-opacity-50 fixed top-0 left-0 z-50 flex justify-center items-center ${props.show ? 'flex' : 'hidden'}`}>
        <div className="bg-white w-96 p-4 rounded-xl relative">
            <X className="absolute top-5 right-5" onClick={() => {props.setShow(false)}}/>
            <h2 className="text-xl font-semibold">Tambah Barang</h2>
            <span className="text-sm">Tambahkan barang ke toko Anda.</span>
            <form className="mt-6">
                <div>
                    <label htmlFor="file" className="w-full p-6 border-2 border-dashed border-black flex flex-col justify-center items-center gap-2 rounded-lg hover:border-blue-500 hover:text-blue-500"><CloudArrowUp size={40}/><span>Upload Gambar</span></label>
                    <input type="file" name="file" id="file" className="hidden"/>
                </div>
                <InputText label="Nama Barang" value={setName}/>
                <InputText label="Stok" value={setStock}/>
                <InputText label="Harga" value={setPrice}/>
                <Button label="Tambah Barang" className="mt-6"/>
            </form>
        </div>
    </div>
}