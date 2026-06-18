import { useEffect, useState } from 'react';
import './AlertaNotificacion.css';

function AlertaNotificacion({ mensaje, onCerrar }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // Configurar temporizador para 3 segundos
        const temporizador = setTimeout(() => {
            setVisible(false);
            if (onCerrar) {
                onCerrar();
            }
        }, 3000);

        // Limpiar temporizador al desmontar
        return () => clearTimeout(temporizador);
    }, [onCerrar]);

    if (!visible) return null;

    return (
        <div className="toast-container">
            <div className="toast-mensaje">
                <span className="toast-icon">✅</span>
                <span className="toast-texto">{mensaje}</span>
                <button className="toast-cerrar" onClick={() => {
                    setVisible(false);
                    if (onCerrar) onCerrar();
                }}>
                    ✕
                </button>
            </div>
        </div>
    );
}

export default AlertaNotificacion;