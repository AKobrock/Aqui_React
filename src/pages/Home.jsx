import React, {useState} from "react";

function Home(){
    const [mensaje, setMensaje] = useState("");
    const validar = () => {
        setMensaje("Validado correctamente");
    };

    return (
        <>
        <main>
            <h1>Aquí Papá</h1>
            <p>Lorem ipsum</p>
        </main>
        <button onClick={validar}>Validar</button>
        {mensaje && <p role="status">{mensaje}</p>}
        </>
    )
}

export default Home;