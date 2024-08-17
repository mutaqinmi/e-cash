'use client'
import InputText from "@/components/input-text";
import InputPassword from "@/components/input-password";
import Button from "@/components/button";
import { useCallback, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { isUserLoggedIn, login } from "@/utils/auth";

export default function SignIn(){
    const route = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [buttonClicked, setButtonClicked] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if(isUserLoggedIn()){
            setIsLoggedIn(true);
            return route.replace('/');
        }
        setIsLoggedIn(false);
    }, [])

    const signIn = useCallback(async (username: string, password: string) => {
        return await axios.post(`${process.env.API_URL}/api/auth/signin`, {
            username: username,
            password: password
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        });
    }, [])

    const submit = () => {
        if(username === '' && password === ''){
            return setErrorMessage('Username dan Password tidak boleh kosong!');
        }
        
        setButtonClicked(true);
        signIn(username, password).then((res) => {
            login(res.data.token);
            route.replace('/');
        }).catch((error: AxiosError) => {
            const err = error.response?.data as {message: string};
            setErrorMessage(err.message);
            setButtonClicked(false);
        })
    }

    return isLoggedIn ? null : <div className="w-screen h-screen grid place-items-center">
        <div className="w-[22rem] shadow-md p-6 rounded-xl">
            <div>
                <h1 className="font-semibold text-3xl">Masuk</h1>
                <p className="text-sm mt-1">Masuk ke akun anda untuk melanjutkan.</p>
            </div>
            {errorMessage === '' ? null : <span className="mt-6 text-center bg-red-300 text-red-900 p-3 rounded-lg text-sm">{errorMessage}</span>}
            <div className="mt-8">
                <InputText label="Username" value={setUsername}/>
                <InputPassword label="Password" value={setPassword}/>
            </div>
            <div className="mt-12">
                <Button label={buttonClicked ? 'Loading ...' : 'Masuk'} onClick={() => submit()} disabled={buttonClicked ? true : false}/>
            </div>
        </div>
    </div>;
}