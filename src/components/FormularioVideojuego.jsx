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
    const [lanzamiento, setLanzamiento] = useState("");
    const [precio, setPrecio] = useState("");
    const [disponible, setDisponible] = useState(true);
    const [progreso, setProgreso] = useState(50);
    const [imagen, setImagen] = useState("");

    // Edicion: 
    useEffect(() => {
    if (juegoRecuperado) {
        setTitulo(juegoRecuperado.titulo);
        setGenero(juegoRecuperado.genero);
        setPlataforma(juegoRecuperado.plataforma);
        setLanzamiento(juegoRecuperado.lanzamiento);
        setPrecio(juegoRecuperado.precio);
        setDisponible(juegoRecuperado.disponible);
        setProgreso(juegoRecuperado.progreso ? Math.round(juegoRecuperado.progreso * 100) : 50);
        setImagen(juegoRecuperado.imagen);
    } else {
        setTitulo("");
        setGenero("");
        setPlataforma("");
        setLanzamiento("");
        setPrecio("");
        setDisponible(true);
        setProgreso(50);
        setImagen("");
    }
}, [juegoRecuperado]);

    // Manejar guardar
    function manejarGuardar() {
        // Validar campos obligatorios
        if (!titulo.trim() || !genero || !plataforma || !lanzamiento || !precio) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        const juegoData = {
            id: juegoRecuperado ? juegoRecuperado.id : Date.now(),
            titulo: titulo.trim(),
            genero,
            plataforma,
            lanzamiento: parseInt(lanzamiento),
            precio: parseFloat(precio),
            disponible,
            progreso: progreso / 100,
            imagen: imagen || "https://via.placeholder.com/50/cccccc/ffffff?text=No+Image"
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
            <form>

                <div>
                    <label>Título *</label>
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        placeholder="Ej: The Legend of Zelda"
                    />
                </div>

                <div>
                    <label>Género *</label>
                    <select
                        value={genero}
                        onChange={(e) => setGenero(e.target.value)}
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
                </div>

                <div>
                    <label>Plataforma *</label>
                    <input
                        type="text"
                        value={plataforma}
                        onChange={(e) => setPlataforma(e.target.value)}
                        placeholder="Ej: PC, PS5, Xbox, Nintendo Switch"
                    />
                </div>

                <div>
                    <label>Año de Lanzamiento *</label>
                    <input
                        type="number"
                        value={lanzamiento}
                        onChange={(e) => setLanzamiento(e.target.value)}
                        placeholder="Ej: 2023"
                        min="1970"
                        max="2025"
                    />
                </div>

                <div>
                    <label>Precio (USD) *</label>
                    <input
                        type="number"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        placeholder="Ej: 29.99"
                        min="0"
                        step="0.01"
                    />
                </div>
                <div>
                    <label>URL de la Imagen</label>
                    <input
                        type="text"
                        value={imagen}
                        onChange={(e) => setImagen(e.target.value)}
                        placeholder="https://ejemplo.com/imagen.jpg"
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

                {/* Botones */}
                <div className="form-buttons" >
                    <button type="button" className="btn-guardar" onClick={manejarGuardar}>
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