import mujer1 from '../assets/mujer1.jpeg';
import mujer2 from '../assets/mujer2.jpeg';
import '../styles/styles.css'; // <--- SE AÑADE LA IMPORTACIÓN

function Nosotros(){
    return(
        <>
            <section className="container text-center pt-5">
                <h1 className="mb-4">Conoce a las creadoras de Aquí Papá</h1>
                <p className="texto-explicativo col-md-8 mx-auto">
                    ¡Conoce al apasionado team que se encuentra detrás de este proyecto! Nosotras hemos
                    brindado dedicación, creatividad y habilidades únicas para poder traer "Aquí Papá" a casa
                    de todas las personas que necesiten una figura paterna en los momentos clave de su vida.
                </p>

                <div className="row row-cols-1 row-cols-md-2 g-4 justify-content-center mt-4">
                    <div className="col">
                        <div className="card h-100 text-center shadow-sm border-0">
                            <img src={mujer1} className="card-img-top" alt="Foto de Julisa Araya" />
                            <div className="card-body">
                                <h5 className="card-title">Julisa Araya</h5>
                                <p className="card-text text-muted">Project Lead</p>
                                <p className="card-text">Julisa es la visionaria del proyecto, asegurándose de que todo se mantenga en curso y alineado con nuestros objetivos.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card h-100 text-center shadow-sm border-0">
                            <img src={mujer2} className="card-img-top" alt="Foto de Astrid Kobrock" />
                            <div className="card-body">
                                <h5 className="card-title">Astrid Kobrock</h5>
                                <p className="card-text text-muted">Lead Developer</p>
                                <p className="card-text">Llevando las ideas a la pantalla con un código limpio y eficiente, para que así puedas encontrar al papá que pueda llenar tus expectativas de la forma más rápida posible.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
 }

 export default Nosotros