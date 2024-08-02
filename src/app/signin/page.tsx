'use client'
import InputText from "@/components/input-text";
import InputPassword from "@/components/input-password";
import Button from "@/components/button";
import { useState } from "react";

export default function SignIn(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return <div className="w-screen h-screen grid place-items-center">
        <div className="w-[22rem] shadow-md p-6 rounded-xl">
            <div>
                <h1 className="font-semibold text-3xl">Masuk</h1>
                <p className="text-sm mt-1">Masuk ke akun anda untuk melanjutkan.</p>
            </div>
            <div className="mt-10">
                <InputText label="Username" value={setUsername}/>
                <InputPassword label="Password" value={setPassword}/>
            </div>
            <div className="mt-12">
                <Button label="Masuk" onClick={() => {alert(`Username: ${username}\nPassword: ${password}`)}} disabled={username != '' && password != '' ? false : true}/>
            </div>
        </div>
    </div>
}