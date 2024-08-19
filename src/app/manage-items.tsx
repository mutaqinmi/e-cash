'use client'
import AddItems from "@/components/add-items";
import Button from "@/components/button";
import ChoiceChip from "@/components/choice-chip";
import Items from "@/components/items";
import Search from "@/components/search";
import axios, { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";

export default function ManageItems(){
    const [showDialog, setShowDialog] = useState(false);
    const [choice, setChoice] = useState(0);
    const [search, setSearch] = useState('');
    const [productList, setProductList] = useState<AxiosResponse[]>([]);

    const products = useCallback(async () => {
        return await axios.get(`${process.env.API_URL}/api/product`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
    }, []);

    const searchProduct = useCallback(async (search: string) => {
        return await axios.get(`${process.env.API_URL}/api/product?search=${search}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
    }, []);

    const getProductsByCategory = useCallback(async (category: string) => {
        return await axios.get(`${process.env.API_URL}/api/product?category=${category}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
    }, [])

    useEffect(() => {
        products().then((res) => {
            setProductList(res.data.data);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const handleSearch = (search: string) => {
        setChoice(0);
        if(search !== ''){
            searchProduct(search).then((res) => {
                setProductList(res.data.data);
            }).catch((err) => {
                console.log(err);
            })
        } else {
            products().then((res) => {
                setProductList(res.data.data);
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    const handleCategory = (category: string) => {
        if(category === 'Semua'){
            products().then((res) => {
                setProductList(res.data.data);
            }).catch((err) => {
                console.log(err);
            })
        } else {
            getProductsByCategory(category).then((res) => {
                setProductList(res.data.data);
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    
    return <>
        <Search placeholder="Cari Produk atau Barang ..." value={search} setvalue={setSearch} onChange={handleSearch}/>
        <div className="mt-6 flex justify-between">
            <div className="flex gap-3">
                <ChoiceChip label="Semua" active={choice === 0 ? true : false} onClick={() => {setChoice(0); handleCategory('Semua')}}/>
                <ChoiceChip label="Makanan" active={choice === 1 ? true : false} onClick={() => {setChoice(1); handleCategory('Makanan')}}/>
                <ChoiceChip label="Minuman" active={choice === 2 ? true : false} onClick={() => {setChoice(2); handleCategory('Minuman')}}/>
                <ChoiceChip label="Lainnya" active={choice === 3 ? true : false} onClick={() => {setChoice(3); handleCategory('Lainnya')}}/>
            </div>
            <Button label="Tambah Barang +" className="max-w-40" onClick={() => {setShowDialog(true)}}/>
        </div>
        <div className="w-full mt-6 grid grid-cols-2 gap-6">
            {productList.length > 0 ? productList.map((item: any) => {
                return <Items key={item.product_id} id={item.product_id} name={item.product_name} price={item.price} stock={item.stock} category={item.category} image={item.product_image} setProductList={setProductList}/>
            }) : <div className="w-full h-96 flex justify-center items-center col-span-2">Barang tidak ditemukan!</div>}
        </div>
        {showDialog ? <AddItems setShow={setShowDialog} setProductList={setProductList}/> : null}
    </>
}