import { X } from "@phosphor-icons/react";
import DropDown from "./dropdown";
import InputText from "./input-text";
import Button from "./button";
import { Dispatch, SetStateAction, useState } from "react";

export default function AddEmployee(props: {setshow: Dispatch<SetStateAction<boolean>>}) {
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    return <div className="w-96 bg-white p-4 rounded-lg relative">
        <X className="absolute top-5 right-5" onClick={() => props.setshow(false)}/>
        <h2 className="text-2xl font-semibold">Tambah Petugas</h2>
        <span className="text-sm">Tambahkan petugas baru.</span>
        <div className="mt-8">
            <DropDown label={type === '' ? 'Tipe Petugas' : type} items={["Admin", "Kasir"]} value={setType}/>
            <InputText label="Nama Petugas" value={setName} />
            <InputText label="Username" value={setUsername} />
            <InputText label="Password" value={setPassword} />
            <InputText label="No Telepon" value={setPhone} />
        </div>
        <Button label="Tambahkan" className="mt-8" onClick={() => alert(`Tipe: ${type}\nNama: ${name}\nUsername: ${username}\nPassword: ${password}\nNo. HP: ${phone}\n`)}/>
    </div>
}