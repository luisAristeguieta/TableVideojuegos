import { useState, useEffect } from 'react';
import TablaVideojuegos from './components/TablaVideojuegos';
import data from './data/videojuegos';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormularioVideojuego from './components/FormularioVideojuego';
import Navbar from './components/Navbar';
import PaginaNoEncontrada from './components/PaginaNoEncontrada';
import AlertaNotificacion from './components/AlertaNotificacion';



function App() {
  // Estado para los videojuegos (usando los datos importados)
  const [videojuegos, setVideojuegos] = useState(() => {
    const datosGuardados = localStorage.getItem("lista_videojuegos");
    return datosGuardados ? JSON.parse(datosGuardados) : data;
  });

  const [alerta, setAlerta] = useState(null); // Agrega variable para alertas

  //Escritura aut - Guarda en localStorage cada vez que cambia el estado
  useEffect(() => {
    localStorage.setItem("lista_videojuegos", JSON.stringify(videojuegos));
  }, [videojuegos]);


  function agregarVideojuego(juegoNuevo) {
    setVideojuegos([...videojuegos, juegoNuevo]);
    setAlerta(`✅ "${juegoNuevo.titulo}" agregado correctamente`);  // Uso de la alerta
  }

  function eliminarVideojuego(id) {
    const juegoEliminado = videojuegos.find((juego) => juego.id === id);
    const filtrados = videojuegos.filter((juego) => juego.id !== id);
    setVideojuegos(filtrados);
    if (juegoEliminado) {
      setAlerta(`🗑️ "${juegoEliminado.titulo}" eliminado correctamente`);
    }
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
    setAlerta(`✏️ "${juegoEditado.titulo}" editado correctamente`); // Uso de la alerta
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
        {alerta && (
          <AlertaNotificacion
            mensaje={alerta}
            onCerrar={() => setAlerta(null)}
          />
        )}
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
