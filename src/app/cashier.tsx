import Items from "@/components/items";
import PaymentInfo from "@/components/payment-info";
import Search from "@/components/search";
import TableHead from "@/components/table-head";
import TableRow from "@/components/table-row-cashier";
import { Storefront } from "@phosphor-icons/react";
import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";

export default function Cashier(){
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [cart, setCart] = useState<any[]>([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const cart = window.localStorage.getItem('cart');
        if(cart === null){
            window.localStorage.setItem('cart', JSON.stringify([]));
            setCart([]);
        } else {
            const cartList: any[] = JSON.parse(cart!);
            setCart(cartList);

            if(cartList.length > 0){
                setTotal(cartList.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0));
            }
        }
    }, []);

    const searchProduct = useCallback(async (query: string) => {
        return await axios.get(`${process.env.API_URL}/api/product/search?query=${query.split(' ').join('+')}`);
    }, []);

    const handleSearch = () => {
        searchProduct(search).then((res) => {
            setSearchResult(res.data.data);
        }).catch((err: AxiosError) => {
            console.log(err);
        });
    }

    return <>
        <div className="relative">
            <Search placeholder="Cari Produk atau Barang ..." value={search} setvalue={setSearch} onChange={handleSearch}/>
            {search.length > 0 ? <div className="absolute mt-4 w-full p-8 bg-white rounded-xl grid grid-cols-2 gap-4 border border-gray-200">
                {searchResult.length === 0 ? <span className="text-center block text-sm text-gray-500 col-span-2">Produk Tidak Ditemukan!</span> : searchResult.map((item: any) => {
                    return <Items key={item.product_id} id={item.product_id} name={item.product_name} price={item.price} stock={item.stock} category={item.category} image={item.product_image} isSearchResult setSearchValue={setSearch} setCart={setCart} setTotal={setTotal}/>
                })}
            </div> : null}
        </div>
        {cart.length === 0 ? <div className="w-full h-[30rem] mt-6 flex flex-col justify-center items-center">
            <div className="p-4 bg-blue-500 rounded-full text-white"><Storefront size={30}/></div>
            <h1 className="text-2xl font-bold mt-4">Mulai Transaksi</h1>
            <span className="text-sm mt-2 text-gray-400">Ketik nama barang pada kolom pencarian untuk memulai.</span>
        </div> : <div className="grid grid-cols-3 gap-6 mt-6">
            <div className="w-full h-fit p-4 col-span-2 rounded-lg shadow-md">
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <TableHead title={['ID', 'Nama Produk', 'Harga', 'Jumlah', 'Total Harga']}/>
                    </thead>
                    <tbody>
                        {cart.map((item: any, index: number) => {
                            return <TableRow key={item.id} id={item.id} name={item.name} price={item.price} quantity={item.quantity} index={index} setCart={setCart} setTotal={setTotal}/>
                        })}
                    </tbody>
                </table>
            </div>
            <div className="w-full p-4 col-span-1 rounded-lg h-fit shadow-md">
                <PaymentInfo total={total}/>
            </div>
        </div>}
    </>
}