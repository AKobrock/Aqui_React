import { useContext } from "react"
import { LoginContext } from "./LoginContext"
import { useNavigate } from "react-router-dom"

function Perfil(){

    const {user, logout} = useContext(LoginContext)
    const navegador = useNavigate()
    const cerrar = () => {
        logout()
        navegador("/")
    }
    return(
        <>
        <h1>Hola, {user}</h1>
        <p>Usuario: {user}</p>
        <button onClick={cerrar}>Cerrar sesión</button>
        </>
    )
}

export default Perfil