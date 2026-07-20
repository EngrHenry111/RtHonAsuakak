import "./Footer.css";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaLinkedinIn
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-content">

        <h2>
          RT. HON. OBONG ASUAKAK UMOH
        </h2>

        <p className="footer-title">
          Executive Chairman, Ibiono Ibom LGA
        </p>

        {/* QUICK LINKS */}
        <div className="footer-links">

          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/leadership">Leadership</a>
          <a href="/achievements">Achievements</a>
          <a href="/education">Education</a>
          <a href="/skills">Skills</a>
          <a href="/gallery">Gallery</a>
          <a href="/news">News</a>

        </div>

        {/* SOCIAL ICONS */}
        <div className="social-icons">

          <a href="https://www.facebook.com/share/1ZUNPkQeDa/" className="icon facebook">
            <FaFacebookF />
          </a>

          <a href="#" className="icon instagram">
            <FaInstagram />
          </a>

          <a href="#" className="icon youtube">
            <FaYoutube />
          </a>

          <a href="#" className="icon tiktok">
            <FaTiktok />
          </a>

          <a href="https://www.linkedin.com/in/obongasuakakumoh" className="icon linkedin">
            <FaLinkedinIn />
          </a>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()}
          {" "}
          RT. HON. OBONG ASUAKAK UMOH.
          All Rights Reserved.
        </p>

        <p>
          Developed by
          {" "}
          <span>EngrHenryTech</span>
        </p>

      </div>

    </footer>
  );
};

export default Footer;