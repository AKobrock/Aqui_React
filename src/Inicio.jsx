function Inicio(){
    return(
        <>
         
    <div class="contenedor-imagen">
        <div class="imagen-wrapper">
        </div>
    </div>

    <div class="texto-explicativo">
        <h1>¡Aquí Papá!</h1>
        <p>
            Somos una empresa única y cercana que ofrece la renta de figuras paternas para quienes necesiten apoyo, compañía y 
            orientación en diferentes momentos de su vida. Desde estar presente en una graduación, enseñar a conducir, brindar consejos 
            antes de un examen importante o simplemente dar apoyo emocional, nuestros papás están preparados para acompañar y hacer sentir 
            a cada persona valorada y respaldada. Porque todos merecen tener a alguien que diga: "¡Estoy orgulloso de ti, hijo!"
        </p>
    </div>


    <div id="carouselExampleCaptions" class="carousel slide">
      <div class="carousel-inner">
      <div class="carousel-item active">
        <div class="custom-caption">
          <h5>Héctor Sanhueza</h5>
          <p>“La receta de la vida siempre necesita un poco de paciencia y mucho cariño.”</p>
          <div class="star-rating">★★★★★</div> 
        </div>
      </div>

      <div class="carousel-item">
        <div class="custom-caption">
          <h5>Marcelo Fuentes</h5>
          <p>“Si algo se rompe, se arregla; y si no se puede, se aprende de ello.”</p>
          <div class="star-rating">★★★★☆</div> 
        </div>
      </div>

      <div class="carousel-item">
        <div class="custom-caption">
          <h5>Ricardo Montalvo</h5>
          <p>“La vida se entiende mirando hacia atrás, pero se vive hacia adelante.”</p>
          <div class="star-rating">★★★★★</div>
        </div>
      </div>
    </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
        </>
    )
}

export default Inicio