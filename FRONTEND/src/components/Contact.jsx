import "./Contact.css";
import { FaEnvelope, FaInstagram, FaLinkedin } from "react-icons/fa";
function Contact() {
  const contacts = [
    {
      title: "Email",
      detail: "econclub@thapar.edu",
      link: "mailto:econ@gmail.com",
      icon: <FaEnvelope />,
    },
    {
      title: "Phone",
      detail: "+91",
      link: "tel:+91",
      icon: "📞",
    },
    {
      title: "Instagram",
      detail: "@econ_tiet",
      link: "https://instagram.com/econ_tiet",
      icon: <FaInstagram />,
    },
    {
      title: "LinkedIn",
      detail: "Our LinkedIn Page",
      link: "https://linkedin.com/company/econclub/",
      icon: <FaLinkedin />,
    },
  ];

  return (
    <div className="page">

      <main className="contact-section">
        <div className="heading">
          <p className="tagline">LET'S CONNECT</p>
          <h1>Get In Touch</h1>
          <p>
            Have questions, ideas or want to collaborate? We'd love to hear from
            you.
          </p>
        </div>

        <div className="contact-grid">
          {contacts.map((contact) => (
            <a
              href={contact.link}
              target={
                contact.title === "Instagram" || contact.title === "LinkedIn"
                  ? "_blank"
                  : undefined
              }
              rel="noopener noreferrer"
              className="contact-card"
              key={contact.title}
            >
              <div className="icon">{contact.icon}</div>
              <h3>{contact.title}</h3>
              <p>{contact.detail}</p>
              <span className="arrow">↗</span>
            </a>
          ))}
        </div>

        <div className="bottom-text">
          <h2>Stay Connected.</h2>
          <p>Follow our journey and be a part of our community.</p>
        </div>
      </main>

      <footer>© 2026 econ club. All rights reserved.</footer>
    </div>
  );
}

export default Contact;
