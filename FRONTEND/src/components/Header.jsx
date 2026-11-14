import { useEffect, useState } from "react";
import wdsLogo from "../assets/wdslogo.png";
import econLogo from "../assets/Econ(White).png";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header className={`header ${scrolled || menuOpen ? "scrolled" : ""}`}>

            <div className="logo-group">
                <a href="#" className="logo logo-econ" onClick={closeMenu}>
                    <img src={econLogo} alt="ECON Club Logo" />
                </a>
                <span className="logo-divider" aria-hidden="true" />
                <a href="#" className="logo" onClick={closeMenu}>
                    <img src={wdsLogo} alt="Wolf of Dalal Street Logo" />
                </a>
            </div>

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
                <a href="#" onClick={closeMenu}>HOME</a>
                <a
                href="https://www.saturnalia.in/events/business"
                target="_self"
                rel="noopener noreferrer"
                onClick={closeMenu} > 
                REGISTER
                </a>
                <a href="#event" onClick={closeMenu}>ABOUT</a>
                <a href="#timeline" onClick={closeMenu}>TIMELINE</a>
                <a href="#gallery" onClick={closeMenu}>GALLERY</a>
                <a href="#contact" onClick={closeMenu}>CONTACT US</a>
            </nav>

        </header>
    );
}

export default Header;
