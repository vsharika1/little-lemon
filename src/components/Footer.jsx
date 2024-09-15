import "../styles/Footer.css"
import Logo from "../assets/Logo.svg"

function Footer() {
  return (
    <div id="main-container">
      <div id="img-container">
        <img src={Logo} alt="Little Lemon Logo" />
      </div>
      <div id="quick-links">
        <h3>Quick Links</h3>
        <p>
          <a href="#">Home</a>
        </p>
        <p>
          <a href="#">About</a>
        </p>
        <p>
          <a href="#">Menu</a>
        </p>
        <p>
          <a href="#">Reservations</a>
        </p>
        <p>
          <a href="#">Order Online</a>
        </p>
        <p>
          <a href="#">Login</a>
        </p>
      </div>
      <div id="contact-info">
        <h3>Contact</h3>
        <p>
          <a href="#">123 Orchard Avenue, Suite 4B, New York, NY 10011, USA</a>
        </p>
        <p>
          <a href="#">contact@littlelemon.com</a>
        </p>
        <p>
          <a href="#">+1 (212) 555-7890</a>
        </p>
      </div>
      <div id="social-media-links">
        <h3>Social Media</h3>
        <p>
          <a href="#">Instagram</a>
        </p>
        <p>
          <a href="#">Facebook</a>
        </p>
        <p>
          <a href="#">Twitter</a>
        </p>
      </div>
    </div>
  );
}

export default Footer;