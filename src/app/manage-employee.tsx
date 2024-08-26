import AddEmployee from "@/components/add-employee";
import Button from "@/components/button";
import DetailEmployee from "@/components/detail-employee";
import EditEmployee from "@/components/edit-employee";
import Search from "@/components/search";
import TableHead from "@/components/table-head";
import TableRow from "@/components/table-row";
import axios, { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";

export default function ManageEmployee(){
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [search, setSearch] = useState('');
    const [employeeList, setEmployeeList] = useState<AxiosResponse[]>([]);
    const [showContext, setShowContext] = useState(false);
    const [selectedID, setSelectedID] = useState('');

    const employees = useCallback(async () => {
        return await axios.get(`${process.env.API_URL}/api/employee`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
    }, []);

    const searchEmployee = useCallback(async (search: string) => {
        return await axios.get(`${process.env.API_URL}/api/employee?search=${search}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
    }, []);

    useEffect(() => {
        employees().then((res) => {
            setEmployeeList(res.data.data);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const searchHandler = (search: string) => {
        if(search !== ''){
            searchEmployee(search).then((res) => {
                setEmployeeList(res.data.data);
            }).catch((err) => {
                console.log(err);
            })
        } else {
            employees().then((res) => {
                setEmployeeList(res.data.data);
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    return <>
        <Search placeholder="Cari petugas ..." value={search} setvalue={setSearch} onChange={searchHandler}/>
        <div className="w-full my-6 flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-semibold">Data Petugas</h1>
                <p className="text-sm text-gray-400">Menampilkan seluruh data petugas.</p>
            </div>
            <Button label="Tambah Petugas +" className="!w-fit" onClick={() => setShowAddDialog(true)}/>
        </div>
        <div className="grid grid-cols-3 gap-6 mt-6">
            <div className="w-full h-fit p-4 col-span-3 rounded-lg shadow-lg">
                <table className="w-full table-auto border-collapse mt-4">
                    <thead>
                        <TableHead title={['ID', 'Jenis', 'Nama']}/>
                    </thead>
                    <tbody>
                        {employeeList.map((employee: any, index: number) => {
                            return <TableRow key={index} data={[employee.employee_id, employee.type, employee.name]} onClick={() => {setSelectedID(employee.employee_id); setShowContext(true)}}/>
                        })}
                    </tbody>
                </table>
            </div>
            {showContext ? <DetailEmployee id={selectedID} setShow={setShowContext} setShowEdit={setShowEditDialog} setEmployeeList={setEmployeeList}/> : null}
            {showAddDialog ? <AddEmployee setshow={setShowAddDialog} setEmployeeList={setEmployeeList}/> : null}
            {showEditDialog ? <EditEmployee id={selectedID} setshow={setShowEditDialog} setEmployeeList={setEmployeeList}/> : null}
        </div>
    </>
}