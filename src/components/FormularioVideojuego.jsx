import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './FormularioVideojuego.css';

function FormularioVideojuego({ onGuardar }) {
    const location = useLocation();
    const navigate = useNavigate();
    const juegoRecuperado = location.state?.juego || null;

    // Variable de estados de los atributos: 
    const [titulo, setTitulo] = useState("");
    const [genero, setGenero] = useState("");
    const [plataforma, setPlataforma] = useState("");
    const [fechaLanzamiento, setFechaLanzamiento] = useState("");
    const [precio, setPrecio] = useState("");
    const [disponible, setDisponible] = useState(true);
    const [progreso, setProgreso] = useState(50);
    const [imagen, setImagen] = useState("");
    const [sinopsis, setSinopsis] = useState("");
    const [calificacion, setCalificacion] = useState("");

    const [errores, setErrores] = useState({});

    function validarFormulario() {
    const nuevosErrores = {};

    // Ningun campo vacio, todo obligatorio: 

    if (!titulo.trim()) {
        nuevosErrores.titulo = "El título es obligatorio.";
    }

    if (!genero) {
        nuevosErrores.genero = "Debes seleccionar un género.";
    }

    if (!plataforma.trim()) {
        nuevosErrores.plataforma = "La plataforma es obligatoria.";
    }

    if (!fechaLanzamiento) {
        nuevosErrores.fechaLanzamiento = "La fecha de lanzamiento es obligatoria.";
    } 

    if (!precio || parseFloat(precio) < 0) {
        nuevosErrores.precio = "El precio es obligatorio y no puede ser menor que 0";
    }

    if (!sinopsis.trim()) {
        nuevosErrores.sinopsis = "La sinopsis es obligatoria.";
    } else if (sinopsis.trim().length < 10) {
        nuevosErrores.sinopsis = "La sinopsis debe tener al menos 10 caracteres.";
    } else if (sinopsis.trim().length > 250) {
        nuevosErrores.sinopsis = "La sinopsis no puede exceder los 250 caracteres.";
    }

    if (!calificacion) {
        nuevosErrores.calificacion = "La calificación es obligatoria.";
    } else if (parseInt(calificacion) < 1 || parseInt(calificacion) > 100) {
        nuevosErrores.calificacion = "La calificación debe estar entre 1 y 100.";
    }

    if (imagen && !imagen.match(/^https?:\/\/.+\..+/)) {
        nuevosErrores.imagen = "La URL debe ser válida (ej: https://...).";
    }

    return nuevosErrores;
}

    // Edicion: 
    useEffect(() => {
    if (juegoRecuperado) {
        setTitulo(juegoRecuperado.titulo);
        setGenero(juegoRecuperado.genero);
        setPlataforma(juegoRecuperado.plataforma);
        setFechaLanzamiento(juegoRecuperado.fechaLanzamiento);
        setPrecio(juegoRecuperado.precio);
        setDisponible(juegoRecuperado.disponible);
        setProgreso(juegoRecuperado.progreso ? Math.round(juegoRecuperado.progreso * 100) : 50);
        setImagen(juegoRecuperado.imagen);
        setSinopsis(juegoRecuperado.sinopsis);
        setCalificacion(juegoRecuperado.calificacion);
    } else {
        setTitulo("");
        setGenero("");
        setPlataforma("");
        setFechaLanzamiento("")
        setPrecio("");
        setDisponible(true);
        setProgreso(50);
        setImagen("");
        setSinopsis("");
        setCalificacion("");
    }
}, [juegoRecuperado]);

    // Manejar guardar
    function manejarGuardar(e) {
        
        e.preventDefault(); // No se enviara si hay algo por default
        const erroresActivos = validarFormulario(); // Verifica su hay errores

        if (Object.keys(erroresActivos).length > 0) {
        setErrores(erroresActivos);
        return;
        }

        setErrores({}); // Si no hay errores, limpiar y guardar para un nuevo analisis


        const juegoData = {
            id: juegoRecuperado ? juegoRecuperado.id : Date.now(),
            titulo: titulo.trim(),
            genero,
            plataforma: plataforma.trim(),
            fechaLanzamiento: fechaLanzamiento,
            precio: parseFloat(precio),
            disponible,
            progreso: progreso / 100,
            imagen: imagen || "https://via.placeholder.com/50/cccccc/ffffff?text=No+Image",
            sinopsis: sinopsis.trim(),
            calificacion: calificacion ? parseInt(calificacion) : null
        };

        onGuardar(juegoData);
        navigate("/");
    }

    // Manejar cancelar (igual que en FormularioEmpleado)
    function manejarCancelar() {
        navigate("/");
    }

    return (
        <div className="formulario-container" >
            <div className="formulario-card">
            <h2>{juegoRecuperado ? "✏️ Editar Videojuego" : "🎮 Nuevo Videojuego"}</h2>
            <form onSubmit={manejarGuardar} >

                <div>
                    <label>Título *</label>
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => { setTitulo(e.target.value);
                            if (errores.titulo) setErrores({ ...errores, titulo: '' });
                        }}

                        placeholder="Ej: The Legend of Zelda"
                        required
                        className={errores.titulo ? 'input-error' : ''}
                    />
                    {errores.titulo && <span className="error-mensaje">{errores.titulo}</span>}
                </div>

                <div>
                    <label>Género *</label>
                    <select
                        value={genero}
                        onChange={(e) => {
                            setGenero(e.target.value);
                            if (errores.genero) setErrores({ ...errores, genero: '' });
                        }} required
                        className={errores.genero ? 'input-error' : ''}
                    >
                        <option value="">Selecciona un género</option>
                        <option value="Aventura">🎯 Aventura</option>
                        <option value="Acción">⚔️ Acción</option>
                        <option value="RPG">🧙 RPG</option>
                        <option value="FPS">🔫 FPS</option>
                        <option value="MOBA">⚡ MOBA</option>
                        <option value="Sandbox">🏗️ Sandbox</option>
                        <option value="Battle Royale">🪂 Battle Royale</option>
                        <option value="Deportes">⚽ Deportes</option>
                        <option value="Carreras">🏎️ Carreras</option>
                    </select>
                    {errores.genero && <span className="error-mensaje">{errores.genero}</span>}
                </div>

                <div>
                    <label>Plataforma *</label>
                    <input
                        type="text"
                        value={plataforma}
                        onChange={(e) => {
                            setPlataforma(e.target.value);
                            if (errores.plataforma) setErrores({ ...errores, plataforma: '' });
                        }}
                        placeholder="Ej: PC, PS5, Xbox, Nintendo Switch"
                        required
                        className={errores.plataforma ? 'input-error' : ''}
                    />
                    {errores.plataforma && <span className="error-mensaje">{errores.plataforma}</span>}
                </div>

                <div>
                    <label>Fecha de Lanzamiento *</label>
                    <input
                        type="date" 
                        value={fechaLanzamiento}
                         onChange={(e) => {
                            setFechaLanzamiento(e.target.value);
                            if (errores.fechaLanzamiento) setErrores({ ...errores, fechaLanzamiento: '' });
                        }}
                        max={new Date().toISOString().split('T')[0]}
                        required
                        className={errores.fechaLanzamiento ? 'input-error' : ''}
                    />
                    {errores.fechaLanzamiento && <span className="error-mensaje">{errores.fechaLanzamiento}</span>}
                </div>

                <div>
                    <label>Precio (USD) *</label>
                    <input
                        type="number"
                        value={precio}
                        onChange={(e) => {
                            setPrecio(e.target.value);
                            if (errores.precio) setErrores({ ...errores, precio: '' });
                        }}
                        placeholder="Ej: 29.99"
                        min="0"
                        step="0.01"
                        required
                    />
                    {errores.precio && <span className="error-mensaje">{errores.precio}</span>}
                </div>
                <div>
                    <label>URL de la Imagen</label>
                    <input
                        type="text"
                        value={imagen}
                        onChange={(e) => {
                            setImagen(e.target.value);
                            if (errores.imagen) setErrores({ ...errores, imagen: '' });
                        }}
                        placeholder="https://ejemplo.com/imagen.jpg"
                        className={errores.imagen ? 'input-error' : ''}
                    />
                    {imagen && (
                        <div>
                            <img
                                src={imagen}
                                alt="Vista previa"
                                style={{ width: "80px", height: "80px", objectFit: "cover" }}
                            />
                        </div>
                    )}
                </div>

                <div>
                    <label>Progreso: {progreso}%</label>
                    <input
                        type="range"
                        value={progreso}
                        onChange={(e) => setProgreso(parseInt(e.target.value))}
                        min="0"
                        max="100"
                        step="1"
                    />
                </div>

                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={disponible}
                            onChange={(e) => setDisponible(e.target.checked)}
                        />
                        ✅ Disponible en tienda
                    </label>
                </div>

                <div>
                    <label>Sinopsis *</label>
                        <textarea
                            value={sinopsis}
                            onChange={(e) => {
                            setSinopsis(e.target.value);
                            if (errores.sinopsis) setErrores({ ...errores, sinopsis: '' });
                        }}
                            placeholder="Escribe una reseña corta del videojuego..."
                            rows="4"
                            minLength="10"
                            maxLength="250"
                            required
                            className={errores.sinopsis ? 'input-error' : ''}
                        />
                        <small>{sinopsis.length}/250 caracteres</small>
                        {errores.sinopsis && <span className="error-mensaje">{errores.sinopsis}</span>}
                </div>

                <div>
                    <label>Calificación (1-100) *</label>
                    <input
                        type="number"
                        value={calificacion}
                        onChange={(e) => {
                            setCalificacion(e.target.value);
                            if (errores.calificacion) setErrores({ ...errores, calificacion: '' });
                        }}
                        placeholder="Ej: 85"
                        min="1"
                        max="100"
                        required
                        className={errores.calificacion ? 'input-error' : ''}
                    />
                    {errores.calificacion && <span className="error-mensaje">{errores.calificacion}</span>}
                </div>
                {/* Botones */}
                <div className="form-buttons" >
                    <button type="submit" className="btn-guardar"> 
                        💾 Guardar
                    </button>
                    <button type="button" className="btn-cancelar" onClick={manejarCancelar}>
                        ❌ Cancelar
                    </button>
                </div>

            </form>
            </div>
        </div>
    );
}

export default FormularioVideojuego;