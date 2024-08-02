'use client'
import { MagnifyingGlass } from "@phosphor-icons/react";

export default function Search(){
    return <div className="relative">
        <input type="text" className="w-full border-[1px] border-slate-400 py-3 pl-12 pr-4 rounded-full outline-none" placeholder="Cari Produk atau Barang ..."/>
        <MagnifyingGlass size={20} className="absolute top-1/2 -translate-y-1/2 left-4"/>
    </div>
}