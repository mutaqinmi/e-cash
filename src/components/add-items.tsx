import { Dispatch, SetStateAction, useCallback, useState } from "react";
import InputText from "./input-text";
import { CloudArrowUp, Pencil, X } from "@phosphor-icons/react";
import Button from "./button";
import DropDown from "./dropdown";
import Image from "next/image";
import axios, { AxiosError } from "axios";

export default function AddItems(props: {setShow: Dispatch<SetStateAction<boolean>>; setProductList: Dispatch<SetStateAction<any[]>>}) {
    const [file, setFile] = useState<FileList | null>();
    const [name, setName] = useState('');
    const [stock, setStock] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');

    const addItem = useCallback(async (file: File, product_name: string, stock: number, price: number, category: string) => {
        return await axios.post(`${process.env.API_URL}/api/product`, {
            file: file,
            product_name: product_name,
            stock: stock,
            price: price,
            category: category
        }, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
    }, []);

    const products = useCallback(async () => {
        return await axios.get(`${process.env.API_URL}/api/product`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
    }, []);

    const submit = (file: File, product_name: string, stock: number, price: number, category: string) => {
        addItem(file, product_name, stock, price, category).then((res) => {
            products().then((res) => {
                props.setProductList(res.data.data);
            }).catch((err) => {
                console.log(err);
            })
            props.setShow(false);
        }).catch((error: AxiosError) => {
            console.log(error)
        })
    }

    return <div className="w-screen h-screen bg-gray-500 bg-opacity-50 fixed top-0 left-0 z-50 flex justify-center items-center">
        <div className="bg-white w-96 p-4 rounded-xl relative">
            <X className="absolute top-5 right-5" onClick={() => {props.setShow(false)}}/>
            <h2 className="text-xl font-semibold">Tambah Barang</h2>
            <span className="text-sm">Tambahkan barang ke toko Anda.</span>
            <div className="mt-6">
                {file ? <div className="w-full h-28 relative">
                    <Image src={URL.createObjectURL(file[0])} alt="Pratinjau Gambar" width={0} height={0} className="w-full h-full object-cover rounded-xl"/>
                    <div className="w-full h-full absolute top-0 left-0 bg-black bg-opacity-35 rounded-xl">
                        <label htmlFor="file" className="w-full h-full text-white flex justify-center items-center"><Pencil size={28}/></label>
                        <input type="file" name="file" id="file" className="hidden" onChange={(e) => {setFile(e.currentTarget.files)}}/>
                    </div>
                </div> : <div>
                    <label htmlFor="file" className="w-full p-6 border-2 border-dashed border-black flex flex-col justify-center items-center gap-2 rounded-lg hover:border-blue-500 hover:text-blue-500"><CloudArrowUp size={40}/><span>Upload Gambar</span></label>
                    <input type="file" name="file" id="file" className="hidden" onChange={(e) => {setFile(e.currentTarget.files)}}/>
                </div>}
                <InputText label="Nama Barang" value={setName}/>
                <InputText label="Stok" value={setStock}/>
                <InputText label="Harga" value={setPrice}/>
                <DropDown label={category === '' ? 'Kategori Barang' : category} items={['Makanan', 'Minuman', 'Lainnya']} value={setCategory}/>
                <Button label="Tambah Barang" className="mt-6" onClick={() => submit(file![0], name, parseInt(stock), parseInt(price), category)}/>
            </div>
        </div>
    </div>
}