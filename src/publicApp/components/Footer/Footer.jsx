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
      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-brand">
          <h2>RT. HON. OBONG ASUAKAK UMOH</h2>
          <p>Executive Chairman, Ibiono Ibom LGA</p>
        </div>

        {/* LINKS */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/leadership">Leadership</a>
          <a href="/achievements">Achievements</a>
          <a href="/news">News</a>
        </div>

        {/* SOCIAL */}
        <div className="footer-social">
          <h4>Connect</h4>

          <div className="social-icons">
            <a href="#" className="icon facebook"><FaFacebookF /></a>
            <a href="#" className="icon instagram"><FaInstagram /></a>
            <a href="#" className="icon youtube"><FaYoutube /></a>
            <a href="#" className="icon tiktok"><FaTiktok /></a>
            <a href="#" className="icon linkedin"><FaLinkedinIn /></a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;