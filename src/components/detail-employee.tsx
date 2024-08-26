import { UserCircle, X } from "@phosphor-icons/react";
import VDivider from "./v-divider";
import EmployeeStatus from "./employee-status";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import Button from "./button";
import OutlinedButton from "./outlined-button";
import axios, { AxiosResponse } from "axios";

export default function DetailEmployee(props: {id: string; setShow: Dispatch<SetStateAction<boolean>>; setShowEdit: Dispatch<SetStateAction<boolean>>; setEmployeeList: Dispatch<SetStateAction<any[]>>}) {
    const [employeeData, setEmployeeData] = useState<AxiosResponse[] | any>([]);
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
    }, [])

    const deleteEmployee = useCallback(async (employee_id: string) => {
        return await axios.delete(`${process.env.API_URL}/api/employee?employee_id=${employee_id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
    }, [])

    useEffect(() => {
        employee(props.id).then((res) => {
            setEmployeeData(res.data.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [employee])

    const deleteHandler = () => {
        const confirmDelete = confirm('Apakah anda yakin ingin menghapus petugas ini?');
        if(!confirmDelete) return;
        deleteEmployee(props.id).then(() => {
            props.setShow(false);
            employees().then((res) => {
                props.setEmployeeList(res.data.data);
            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    return employeeData[0] !== undefined ? <div className="w-screen h-screen fixed top-0 left-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="w-96 h-fit p-4 rounded-lg relative bg-white">
            <X size={20} className="absolute top-5 right-5" onClick={() => props.setShow(false)}/>
            <UserCircle size={60} className="w-full"/>
            <div className="w-full mt-4 text-center">
                <h1 className="text-lg font-semibold">{employeeData[0] === undefined ? '' : employeeData[0].name}</h1>
                <div className="text-sm flex justify-center items-center">
                    <span className="mx-2">{employeeData[0] === undefined ? '' : employeeData[0].type}</span>
                    <VDivider/>
                    <EmployeeStatus online={employeeData[0] === undefined ? false : employeeData[0].status === 'online' ? true : false}/>
                </div>
                <div className="flex gap-2 mt-8">
                    <OutlinedButton label="Hapus Petugas" onClick={() => deleteHandler()}/>
                    <Button label="Edit Petugas" onClick={() => {props.setShow(false); props.setShowEdit(true)}}/>
                </div>
            </div>
        </div>
    </div> : null;
}