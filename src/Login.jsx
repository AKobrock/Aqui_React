import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LoginContext } from "./LoginContext"


function Login(){

    const navegador = useNavigate()
    const [texto, setTexto] = useState("")
    const {login} = useContext(LoginContext)

    const Validacion = () => {
        login(texto)
        navegador("/profile")
    }
    return(
        <form>
        <input type="text" 
        value={texto}
        onChange = {(e) => setTexto(e.target.value)} />
        <button onClick={Validacion} Inicia sesion></button>
        </form>
    )

}

export default Login
