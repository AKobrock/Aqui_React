export default function Registro(){
    return(
        <>
        <section id="section-11" class="pb-4">

  <h2 class="mb-4">Regístrate con nosotros</h2>

        <div class="container py-4">
          <div class="row g-0 align-items-center">
            <div class="col-lg-6 mb-5 mb-lg-0">
              <div class="card cascading-right bg-body-tertiary" style="backdrop-filter: blur(30px);">
                <div class="card-body p-5 shadow-5 text-center">
                  <h2 class="fw-bold mb-5">Registrate ahora</h2>
                  <form>

                    <div class="row">
                      <div class="col-md-6 mb-4">
                        <div class="form-outline">
                          <input type="text" id="firstName" class="form-control" />
                          <label class="form-label" for="firstName">Primer nombre</label>
                        </div>
                      </div>
                      <div class="col-md-6 mb-4">
                        <div class="form-outline">
                          <input type="text" id="lastName" class="form-control" />
                          <label class="form-label" for="lastName">Apellidos</label>
                        </div>
                      </div>
                    </div>


                    <div class="form-outline mb-4">
                      <input type="email" id="email" class="form-control" />
                      <label class="form-label" for="email">Correo electrónico</label>
                    </div>


                    <div class="form-outline mb-4">
                      <input type="password" id="password" class="form-control" />
                      <label class="form-label" for="password">Contraseña</label>
                    </div>


                    <div class="form-check d-flex justify-content-center mb-4">
                      <input class="form-check-input me-2" type="checkbox" id="newsletter" checked />
                      <label class="form-check-label" for="newsletter">
                        Suscríbete a para promociones y noticias
                      </label>
                    </div>


                    <button type="submit" class="btn btn-primary btn-block mb-4">
                      Registrarse
                    </button>

     
                    <div class="text-center">
                      <p>O registrate con:</p>
                      <button type="button" class="btn btn-link btn-floating mx-1">
                        <i class="fab fa-facebook-f"></i>
                      </button>
                      <button type="button" class="btn btn-link btn-floating mx-1">
                        <i class="fab fa-google"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>


            <div class="col-lg-6 mb-5 mb-lg-0">
              <img src="images/papahijopayment.webp" class="w-100 rounded-4 shadow-4" alt="Registration illustration" />
            </div>
          </div>
        </div>

<div className="border rounded-5">
  <section className="w-100 p-4">
    <section className="text-center text-lg-start">
      {/* Los estilos deben ir en un archivo CSS */}
    </section>
  </section>
</div>

</section>
        </>
    )
}