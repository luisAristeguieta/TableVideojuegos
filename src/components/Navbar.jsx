import { Link } from 'react-router-dom';
import './Navbar.css';



function Navbar() {
    return (
        <nav className="navbar">
            <span className="navbar-logo">🎮 GestorGames</span>
            <div className="navbar-links">
                <Link to="/" className="nav-link">📋 Inventario</Link>
                <Link to="/nuevo" className="nav-link">➕ Nuevo Juego</Link>
            </div>
        </nav>
    );
}

export default Navbar;