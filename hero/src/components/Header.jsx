
import { useState } from "react";
import wdsLogo from "../assets/wdslogo.png";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header className="header">

            <a href="/" className="logo" onClick={closeMenu}>
                <img src={wdsLogo} alt="Wolf of Dalal Street Logo" />
            </a>

            <button
                className={`hamburger ${menuOpen ? "open" : ""}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle navigation"
                aria-expanded={menuOpen}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
                <a href="/" onClick={closeMenu}>HOME</a>
                <a href="#register" onClick={closeMenu}>REGISTER</a>
                <a href="#about" onClick={closeMenu}>ABOUT</a>
                <a href="/gallery" onClick={closeMenu}>GALLERY</a>
                <a href="#about" onClick={closeMenu}>CONTACT US</a>
            </nav>

        </header>
    );
}

export default Header;
