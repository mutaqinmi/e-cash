'use client'
import AddItems from "@/components/add-items";
import Button from "@/components/button";
import ChoiceChip from "@/components/choice-chip";
import Items from "@/components/items";
import Search from "@/components/search";
import { useState } from "react";

export default function ManageItems(){
    const [showDialog, setShowDialog] = useState(false);
    const [choice, setChoice] = useState(0);
    return <>
        <Search placeholder="Cari Produk atau Barang ..."/>
        <div className="mt-6 flex justify-between">
            <div className="flex gap-3">
                <ChoiceChip label="Semua" active={choice === 0 ? true : false} onClick={() => {setChoice(0)}}/>
                <ChoiceChip label="Makanan" active={choice === 1 ? true : false} onClick={() => {setChoice(1)}}/>
                <ChoiceChip label="Minuman" active={choice === 2 ? true : false} onClick={() => {setChoice(2)}}/>
                <ChoiceChip label="Lainnya" active={choice === 3 ? true : false} onClick={() => {setChoice(3)}}/>
            </div>
            <Button label="Tambah Barang +" className="max-w-40" onClick={() => {setShowDialog(true)}}/>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-6">
            <Items id="P-122245" name="Milku Coklat" price={3500} stock={67} category="Minuman"/>
            <Items id="P-122245" name="Milku Coklat" price={3500} stock={67} category="Minuman"/>
            <Items id="P-122245" name="Milku Coklat" price={3500} stock={67} category="Minuman"/>
            <Items id="P-122245" name="Milku Coklat" price={3500} stock={67} category="Minuman"/>
            <Items id="P-122245" name="Milku Coklat" price={3500} stock={67} category="Minuman"/>
        </div>
        {showDialog ? <AddItems show={showDialog ? true : false} setShow={setShowDialog}/> : null}
    </>
}