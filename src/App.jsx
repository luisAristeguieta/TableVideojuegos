import { useState } from 'react'
import TablaVideojuegos from './components/TablaVideojuegos';
import data from './data/videojuegos';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormularioVideojuego from './components/FormularioVideojuego';
import Navbar from './components/Navbar';
import PaginaNoEncontrada from './components/PaginaNoEncontrada';



function App() {
  // Estado para los videojuegos (usando los datos importados)
  const [videojuegos, setVideojuegos] = useState(data);

  function agregarVideojuego(juegoNuevo) {
    setVideojuegos([...videojuegos, juegoNuevo]);
  }

  function eliminarVideojuego(id) {
    const filtrados = videojuegos.filter((juego) => juego.id !== id);
    setVideojuegos(filtrados);
  }

  function editarVideojuego(juegoEditado) {
    const actualizados = videojuegos.map((juego) => {
      if (juego.id === juegoEditado.id) {
        return juegoEditado;
      } else {
        return juego;
      }
    });
    setVideojuegos(actualizados);
  }

  function manejarGuardar(empleado) {
    const existe = videojuegos.find((j) => j.id === empleado.id);
    if (existe) {
      editarVideojuego(empleado);
    } else {
      agregarVideojuego(empleado);
    }
  }

  return (
     <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <TablaVideojuegos
                videojuegos={videojuegos}
                onEliminar={eliminarVideojuego}
              />
            }
          />
          <Route
            path="/nuevo"
            element={<FormularioVideojuego onGuardar={manejarGuardar} />}
          />
          <Route
            path="/editar"
            element={<FormularioVideojuego onGuardar={manejarGuardar} />}
          />
          <Route
            path="*"
            element={<PaginaNoEncontrada />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
