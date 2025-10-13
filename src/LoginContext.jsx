import { createContext, useEffect, useState } from "react";

export const LoginContext = createContext()

export function LoginProvider({children}){
    const [user, setUser] = useState(null)

    useEffect(() =>{
        const usuarioGuardado = sessionStorage.getItem("user")
        if (usuarioGuardado) setUser (usuarioGuardado)
    }, [])


    const login = (userName) => {
        sesionStorage.setItem("user", userName)
        setUser(userName)
    }

    const logout = () => {
        sesionStorage.removeItem("user")
        setUser(null)
    }

    return(
        <LoginContext.Provider value={{ user, login, logout}}>
            {children}
        </LoginContext.Provider>

    )
}

