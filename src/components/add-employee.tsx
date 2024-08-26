import { X } from "@phosphor-icons/react";
import DropDown from "./dropdown";
import InputText from "./input-text";
import Button from "./button";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import axios from "axios";

export default function AddEmployee(props: {setshow: Dispatch<SetStateAction<boolean>>; setEmployeeList: Dispatch<SetStateAction<any[]>>}) {
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const employees = useCallback(async () => {
        return await axios.get(`${process.env.API_URL}/api/employee`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
    }, []);

    const addEmployee = useCallback(async (type: string, name: string, username: string, password: string, phone: string) => {
        return await axios.post(`${process.env.API_URL}/api/employee`, {
            type: type,
            name: name,
            username: username,
            password: password,
            phone: phone
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
    }, []);

    const submit = (type: string, name: string, username: string, password: string, phone: string) => {
        addEmployee(type, name, username, password, phone).then((res) => {
            employees().then((res) => {
                props.setEmployeeList(res.data.data);
                props.setshow(false);
            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    return <div className="bg-gray-500 bg-opacity-50 w-screen h-screen fixed top-0 left-0 z-50 flex justify-center items-center">
        <div className="w-96 bg-white p-4 rounded-lg relative">
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
            <Button label="Tambahkan" className="mt-8" onClick={() => submit(type, name, username, password, phone)}/>
        </div>
    </div>
}