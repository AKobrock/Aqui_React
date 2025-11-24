import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'


createRoot(document.getElementById('root')).render(
  /*modo de desarrollo que prueba cosas, si la pagina funciona bien*/
  
  <StrictMode> 
    <App />
  </StrictMode>

)

