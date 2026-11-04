import "./Contact.css";
import { FaEnvelope, FaInstagram, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

const PHONE_DISPLAY = "+91 90410 26330";
const PHONE_RAW = "919041026330";

const channels = [
  {
    code: "01",
    title: "Email",
    detail: "econclub@thapar.edu",
    cta: "Send a message",
    link: "mailto:econclub@thapar.edu",
    icon: <FaEnvelope />,
  },
  {
    code: "02",
    title: "Call",
    detail: PHONE_DISPLAY,
    cta: "Dial the crew",
    link: `tel:+${PHONE_RAW}`,
    icon: <FaPhoneAlt />,
  },
  {
    code: "03",
    title: "Instagram",
    detail: "@econ_tiet",
    cta: "Follow the heist",
    link: "https://instagram.com/econ_tiet",
    icon: <FaInstagram />,
    external: true,
  },
];

function Contact() {
  return (
    <div className="contact-page" id="contact">
      <div className="contact-glow" aria-hidden="true" />

      <main className="contact-section">
        <div className="contact-heading">
          <h1>
            GET IN <b>TOUCH</b>
          </h1>
          <p className="contact-lead">
            Questions about the heist, ideas for a collab, or just want to say hi?
            Pick a channel — the crew replies fast.
          </p>
        </div>

        <div className="contact-grid">
          {channels.map((c) => (
            <a
              key={c.title}
              href={c.link}
              target={c.external ? "_blank" : undefined}
              rel={c.external ? "noopener noreferrer" : undefined}
              className="contact-card"
            >
              <span className="contact-code">CHANNEL {c.code}</span>
              <span className="contact-icon">{c.icon}</span>
              <h3>{c.title}</h3>
              <p>{c.detail}</p>
              <span className="contact-cta">
                {c.cta} <em>→</em>
              </span>
            </a>
          ))}
        </div>

        <div className="contact-bottom">
          <span className="contact-rule" />
          <h2>
            STAY <b>CONNECTED.</b>
          </h2>
          <span className="contact-rule" />
        </div>
        <p className="contact-bottom-note">Follow our journey and be a part of the community.</p>
      </main>

      <footer className="contact-footer">© 2026 ECON Club. All rights reserved.</footer>
    </div>
  );
}

export default Contact;
