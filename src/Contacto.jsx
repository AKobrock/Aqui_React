function Contacto(){
    return(
        <>
        <div class="container mt-5">
            <h2 class="text-center mb-4">Contáctanos</h2>
            <form>
                <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="nombre" required/>
                </div>
                <div class="mb-3">
                <label for="email" class="form-label">Correo electrónico</label>
                <input type="email" class="form-control" id="email" required/>
                </div>
                <div class="mb-3">
                <label for="mensaje" class="form-label">Mensaje</label>
                <textarea class="form-control" id="mensaje" rows="4" required/>
                </div>
                <button type="submit" class="btn btn-primary">Enviar</button>
            </form>
            </div>
        </>
    )
}

export default Contacto