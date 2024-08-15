export function login(token: string){
    localStorage.setItem('token', token);
}

export function logout(){
    localStorage.removeItem('token');
}

export function isUserLoggedIn(){
    if(typeof window !== 'undefined'){
        const token = localStorage.getItem('token');
        return !!token;
    }

    return false;
}