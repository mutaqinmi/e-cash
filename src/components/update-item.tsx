import { Dispatch, SetStateAction, useCallback, useState } from "react";
import InputText from "./input-text";
import { X } from "@phosphor-icons/react";
import Button from "./button";
import DropDown from "./dropdown";
import axios, { AxiosError } from "axios";

export default function UpdateItems(props: {id: string; name: string; stock: string; price: string; category: string; setShow: Dispatch<SetStateAction<boolean>>; setProductList: Dispatch<SetStateAction<any[]>>}) {
    const [name, setName] = useState(props.name);
    const [stock, setStock] = useState(props.stock);
    const [price, setPrice] = useState(props.price);
    const [category, setCategory] = useState(props.category);

    const updateItem = useCallback(async (product_id: string, product_name: string, stock: number, price: number, category: string) => {
        return await axios.patch(`${process.env.API_URL}/api/product?product_id=${product_id}`, {
            product_name: product_name,
            stock: stock,
            price: price,
            category: category
        }, {
            headers: {
                "Content-Type": "application/json",
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

    const submit = (product_id: string, product_name: string, stock: number, price: number, category: string) => {
        updateItem(product_id, product_name, stock, price, category).then((res) => {
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
            <h2 className="text-xl font-semibold">Edit Barang</h2>
            <span className="text-sm">Edit barang.</span>
            <div className="mt-6">
                <InputText label="Nama Barang" value={setName} initialValue={name}/>
                <InputText label="Stok" value={setStock} initialValue={stock}/>
                <InputText label="Harga" value={setPrice} initialValue={price}/>
                <DropDown label={category === '' ? 'Kategori Barang' : category} items={['Makanan', 'Minuman', 'Lainnya']} value={setCategory}/>
                <Button label="Edit Barang" className="mt-6" onClick={() => submit(props.id, name, parseInt(stock), parseInt(price), category)}/>
            </div>
        </div>
    </div>
}