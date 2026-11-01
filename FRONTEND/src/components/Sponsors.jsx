
import "./Sponsors.css";

function Sponsors() {
  const partners = [1, 2, 3, 4];

  return (
    <section className="sponsors-section">

      <div className="classified-tag">
        CLASSIFIED FILE // WDS 12.0
      </div>

      <div className="sponsors-heading">
        <p className="operation-label">
          OPERATION: WOLF OF DALAL STREET
        </p>

        <h1>
          THE BACKERS
          <br />
          <span>OF THE HEIST</span>
        </h1>

        <p className="sponsors-subtitle">
          Every great operation needs powerful allies.
        </p>
      </div>

      <div className="red-divider"></div>

      <div className="title-sponsor">
        <p className="section-number">01 / PRIMARY BACKER</p>

        <div className="title-logo">
          <span>YOUR LOGO HERE</span>
        </div>

        <h3>TITLE SPONSOR</h3>
      </div>

      <div className="partners-container">
        <p className="section-number">02 / THE CREW'S ALLIES</p>

        <h2>OUR PARTNERS</h2>

        <div className="partners-grid">
          {partners.map((partner) => (
            <div className="partner-card" key={partner}>
              <div className="partner-logo">
                LOGO PLACEHOLDER
              </div>

              <p>SPONSOR {partner}</p>
              <span>OFFICIAL PARTNER</span>
            </div>
          ))}
        </div>
      </div>

      <div className="closing-statement">
        <p>NO HEIST IS POSSIBLE WITHOUT THE RIGHT ALLIES.</p>
        <span>END OF FILE // WDS 12.0</span>
      </div>

    </section>
  );
}

export default Sponsors;
