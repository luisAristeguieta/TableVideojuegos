
import imagen404 from '../assets/404.PNG';

function PaginaNoEncontrada() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '70vh',
            textAlign: 'center'
        }}>
            <img 
                src={imagen404} 
                alt="Página no encontrada"
                style={{
                    maxWidth: '400px',
                    width: '100%',
                    borderRadius: '10px',
                    marginBottom: '20px'
                }}
            />
            <h2 style={{ color: '#4a148c' }}>⚠️ Página no encontrada</h2>
            <p style={{ color: '#999' }}>Lo sentimos, la página que buscas no existe.</p>
        </div>
    );
}

export default PaginaNoEncontrada;