import { X } from "@phosphor-icons/react";
import DropDown from "./dropdown";
import InputText from "./input-text";
import Button from "./button";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import axios from "axios";

export default function EditEmployee(props: {id: string; setshow: Dispatch<SetStateAction<boolean>>; setEmployeeList: Dispatch<SetStateAction<any[]>>}) {
    const [id, setId] = useState('');
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

    const employee = useCallback(async (employee_id: string) => {
        return await axios.get(`${process.env.API_URL}/api/employee?employee_id=${employee_id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
    }, []);

    useEffect(() => {
        employee(props.id).then((res) => {
            setId(res.data.data[0].employee_id);
            setType(res.data.data[0].type);
            setName(res.data.data[0].name);
            setUsername(res.data.data[0].username);
            setPassword(res.data.data[0].password);
            setPhone(res.data.data[0].phone);
        }).catch((err) => {
            console.log(err);
        })
    }, [employee, props.id])

    const editEmployee = useCallback(async (id: string, type: string, name: string, username: string, password: string, phone: string) => {
        return await axios.patch(`${process.env.API_URL}/api/employee?employee_id=${id}`, {
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

    const submit = (id: string, type: string, name: string, username: string, password: string, phone: string) => {
        editEmployee(id, type, name, username, password, phone).then((res) => {
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

    return name !== '' ? <div className="bg-gray-500 bg-opacity-50 w-screen h-screen fixed top-0 left-0 z-50 flex justify-center items-center">
        <div className="w-96 bg-white p-4 rounded-lg relative">
            <X className="absolute top-5 right-5" onClick={() => props.setshow(false)}/>
            <h2 className="text-2xl font-semibold">Edit Petugas</h2>
            <span className="text-sm">Edit petugas.</span>
            <div className="mt-8">
                <DropDown label={type === '' ? 'Tipe Petugas' : type} items={["Admin", "Kasir"]} value={setType}/>
                <InputText label="Nama Petugas" value={setName} initialValue={name}/>
                <InputText label="Username" value={setUsername} initialValue={username}/>
                <InputText label="Password" value={setPassword} initialValue={password}/>
                <InputText label="No Telepon" value={setPhone} initialValue={phone}/>
            </div>
            <Button label="Edit Petugas" className="mt-8" onClick={() => submit(id, type, name, username, password, phone)}/>
        </div>
    </div> : null;
}