import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { CloudArrowUp, Pencil, X } from "@phosphor-icons/react";
import Button from "./button";
import Image from "next/image";
import axios from "axios";

export default function UploadItems(props: {id: string; image: string; setShow: Dispatch<SetStateAction<boolean>>; setProductList: Dispatch<SetStateAction<any[]>>;}) {
    const [file, setFile] = useState<FileList | null>();

    const uploadItem = useCallback(async (file: File, product_id: string, product_image: string) => {
        return await axios.patch(`${process.env.API_URL}/api/product?product_id=${product_id}&product_image=${product_image}`, {
            file: file,
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

    const submit = (file: File, product_id: string, product_image: string) => {
        uploadItem(file, product_id, product_image).then((res) => {
            products().then((res) => {
                props.setProductList(res.data.data);
                location.reload();
            }).catch((err) => {
                console.log(err);
            })
            props.setShow(false);
        }).catch((err) => {
            console.log(err);
        })
    }

    return <div className="w-screen h-screen bg-gray-500 bg-opacity-50 fixed top-0 left-0 z-50 flex justify-center items-center">
        <div className="bg-white w-96 p-4 rounded-xl relative">
            <X className="absolute top-5 right-5" onClick={() => {props.setShow(false)}}/>
            <h2 className="text-xl font-semibold">Ubah Gambar Barang</h2>
            <span className="text-sm">Ubah gambar barang.</span>
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
                <Button label="Ubah Gambar Barang" className="mt-6" onClick={() => submit(file![0], props.id, props.image)}/>
            </div>
        </div>
    </div>
}