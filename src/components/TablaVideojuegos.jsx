// src/components/TablaVideojuegos.jsx
import './TablaVideojuegos.css';

function TablaVideojuegos({ videojuegos, onEliminar, onEditar }) {
    // Función para formatear el precio
    const formatearPrecio = (precio) => {
        if (precio === 0) return 'Gratis';
        return `$${precio.toFixed(2)}`;
    };

    // Función para calcular el porcentaje de progreso
    const calcularPorcentaje = (progreso) => {
        return `${Math.round(progreso * 100)}%`;
    };

    return (
        <div className="videojuegos-container">
            <div className="videojuegos-card">
                <div className="videojuegos-header">
                    <h2>🎮 Tienda de Videojuegos</h2>
                    <p>Total: <strong>{videojuegos.length}</strong> juegos disponibles</p>
                </div>

                <div className="tabla-wrapper">
                    <table className="tabla-videojuegos">
                        <thead>
                            <tr>
                                <th>IMAGEN</th>
                                <th>TÍTULO</th>
                                <th>GÉNERO</th>
                                <th>PLATAFORMA</th>
                                <th>AÑO</th>
                                <th>PRECIO</th>
                                <th>PROGRESO</th>
                                <th>ESTADO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {videojuegos.map((juego) => (
                                <tr key={juego.id}>
                                    <td className="imagen-cell">
                                        <img
                                            src={juego.imagen}
                                            alt={juego.titulo}
                                            className="juego-imagen"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/50/cccccc/ffffff?text=No+Image';
                                            }}
                                        />
                                    </td>
                                    <td className="titulo-cell">
                                        <strong>{juego.titulo}</strong>
                                    </td>
                                    <td>{juego.genero}</td>
                                    <td>{juego.plataforma}</td>
                                    <td className="centrado">{juego.lanzamiento}</td>
                                    <td className="precio-cell">{formatearPrecio(juego.precio)}</td>
                                    <td className="progreso-cell">
                                        <div className="barra-progreso-container">
                                            <div
                                                className="barra-progreso"
                                                style={{ width: calcularPorcentaje(juego.progreso) }}
                                            >
                                                <span className="progreso-texto">
                                                    {calcularPorcentaje(juego.progreso)}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="estado-cell">
                                        <span className={`badge ${juego.disponible ? 'badge-disponible' : 'badge-no-disponible'}`}>
                                            {juego.disponible ? 'Disponible' : 'Agotado'}
                                        </span>
                                    </td>

                                    <td className="acciones-cell">
                                        <button
                                            className="btn-editar"
                                            onClick={() => onEditar(juego)}
                                        >
                                            ✏️ Editar
                                        </button>
                                        <button
                                            className="btn-eliminar"
                                            onClick={() => onEliminar(juego.id)}
                                        >
                                            🗑️ Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TablaVideojuegos;