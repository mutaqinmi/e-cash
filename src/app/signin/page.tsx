'use client'
import InputText from "@/components/input-text";
import InputPassword from "@/components/input-password";
import Button from "@/components/button";
import { useCallback, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export default function SignIn(){
    const route = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const storage = window.localStorage;
    const token = storage.getItem("token");

    const signIn = useCallback(async (username: string, password: string) => {
        return await axios.post('http://localhost:3000/api/auth/signin', {
            username: username,
            password: password
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        });
    }, [])

    const submit = () => {
        if(username !== '' && password !== ''){
            signIn(username, password).then((res) => {
                console.log(res.data);
            }).catch((error: AxiosError) => {
                const err = error.response?.data as {message: string};
                alert(err.message);
            })
        }
    }

    return token !== null ? route.push('/') : <div className="w-screen h-screen grid place-items-center">
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
                <Button label="Masuk" onClick={() => submit()} disabled={username !== '' && password !== '' ? false : true}/>
            </div>
        </div>
    </div>
}