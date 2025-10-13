export default function Sesion(){
    return (
        <section class="w-100 px-4 py-5" >
      <div class="row d-flex justify-content-center">
        <div class="col-12 col-md-8 col-lg-6 col-xl-6">
          <div class="card shadow-2-strong" >
            <div class="card-body p-5 text-center">

              <h3 class="mb-5">Ingresa a tu cuenta</h3>

              <form id="loginForm">
              <div class="form-outline mb-4">
                <input type="email" id="typeEmailX-2" class="form-control form-control-lg" placeholder="Email" />
              </div>

              <div class="form-outline mb-4">
                <input type="password" id="typePasswordX-2" class="form-control form-control-lg" placeholder="Password" />
              </div>

              <div class="form-check d-flex justify-content-start mb-4">
                <input class="form-check-input" type="checkbox" id="form1Example3" />
                <label class="form-check-label ms-2" for="form1Example3">Recordar la contraseña</label>
              </div>

              <button class="btn btn-primary btn-lg btn-block w-100" type="submit">Ingresar</button>
              </form>
              
              <hr class="my-4"/>

              <button class="btn btn-lg btn-block w-100 mb-2 text-white" type="button">
                <i class="fab fa-google me-2"></i> Ingresa con Google
              </button>
              <button class="btn btn-lg btn-block w-100 text-white" type="button">
                <i class="fab fa-facebook-f me-2"></i> Ingresa con Facebook
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
    )
}