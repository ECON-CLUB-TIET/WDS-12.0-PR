
function Hero() {
    return (
        <section className="hero">

            {/* Dark overlay */}
            <div className="hero-overlay"></div>

            {/* Main content */}
            <div className="hero-content">

                <div className="event-label">
                    <span></span>
                    ECON PRESENTS
                    <span></span>
                </div>

                <h1>
                    <span className="title-white">WOLF OF</span>
                    <span className="title-red">DALAL STREET</span>
                </h1>

                <div className="hero-buttons">

                    <a href="#/register" className="register-btn">
                        REGISTER NOW
                    </a>

                    <a href="#event" className="explore-btn">
                        EXPLORE EVENT
                    </a>

                </div>

            </div>

            {/* Bottom categories */}
            <div className="hero-footer">

                <span className="footer-line"></span>

                <span>STRATEGY</span>

                <span className="separator">|</span>

                <span>FINANCE</span>

                <span className="separator">|</span>

                <span>COMPETITION</span>

                <span className="footer-line"></span>

            </div>

        </section>
    );
}

export default Hero;
