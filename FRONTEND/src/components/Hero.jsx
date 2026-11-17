
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

                    <a href="https://www.saturnalia.in/events/business" className="register-btn">
                        REGISTER NOW
                    </a>

                    <a href="#event" className="explore-btn">
                        EXPLORE EVENT
                    </a>

                </div>
                <div className="event-details">

                    <div className="detail-item">
                        <span className="detail-label">VENUE</span>
                        <span className="detail-value">LT 101</span>
                    </div>

                    <div className="detail-divider"></div>

                    <div className="detail-item">
                        <span className="detail-label">DATE</span>
                        <span className="detail-value">22 NOV 2026</span>
                    </div>

                    <div className="detail-divider"></div>

                    <div className="detail-item">
                        <span className="detail-label">TIME</span>
                        <span className="detail-value">10:00 AM</span>
                    </div>
                    <div className="detail-divider"></div>


                </div>

            </div>

        </section>
    );
}

export default Hero;
