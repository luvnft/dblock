import React from "react";
import { NavLink } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { Logo } from "../assets/export";
import '../assets/styles/footer.css';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-container-first-box">
        <img src={Logo} alt="DcodeBlock-Logo" className="footer-container-box-logo" />
        <p className="footer-container-box-text">We help web2 developers to pivot into web3 Development Ecosystem. Our platform lets you LEARN. BUILD. EARN. Get HIRED. Go from Zero to One with us!!</p>

        <div className="footer-container-links-box">
          <NavLink className="footer-container-box-heading">About us</NavLink>
          <NavLink className="footer-container-box-heading">Contact us</NavLink>
          <NavLink className="footer-container-box-heading">Feedback</NavLink>

          <div className="footer-container-box-heading-wrapper">
            <NavLink className="footer-container-box-heading">Privacy Policy</NavLink>
            <div className="footer-container-box-divider"></div>
            <NavLink className="footer-container-box-heading">Terms and Conditions</NavLink>
          </div>
        </div>

        <div className="footer-container-box-social-media-wrapper">
          <NavLink to="https://www.instagram.com/dcodeblock/" target="_blank" className="footer-container-box-social-media-icon"><FaInstagram /></NavLink>
          <NavLink className="footer-container-box-social-media-icon"><FaFacebookF /></NavLink>
          <NavLink to="https://x.com/dcodeblock24" target="_blank" className="footer-container-box-social-media-icon"><FaTwitter /></NavLink>
          <NavLink to="https://www.linkedin.com/company/dcodeblock/" target="_blank" className="footer-container-box-social-media-icon"><FaLinkedinIn /></NavLink>
          <NavLink className="footer-container-box-social-media-icon"><FaYoutube /></NavLink>
        </div>
      </div>

      <div className="footer-container-last-box">
        <h4 className="footer-container-box-heading">Resources</h4>
        <NavLink className="footer-container-box-link">Blogs</NavLink>
        <NavLink className="footer-container-box-link">Newsletter</NavLink>
        <NavLink className="footer-container-box-link">Tutorials</NavLink>
        <NavLink className="footer-container-box-link">Compiler</NavLink>
      </div>

      <div className="footer-container-last-box">
        <h4 className="footer-container-box-heading">DCODEBLOCK</h4>
        <NavLink className="footer-container-box-link">About</NavLink>
        <NavLink className="footer-container-box-link">Features</NavLink>
        <NavLink className="footer-container-box-link">Works</NavLink>
        <NavLink className="footer-container-box-link">Career</NavLink>
      </div>

      <div className="footer-container-last-box">
        <h4 className="footer-container-box-heading">HELP</h4>
        <NavLink className="footer-container-box-link">Customer Support</NavLink>
        <NavLink className="footer-container-box-link">Delivery Details</NavLink>
        <NavLink className="footer-container-box-link">Terms & Conditions</NavLink>
        <NavLink className="footer-container-box-link">Privacy Policy</NavLink>
      </div>
    </div>
  );
};

export default Footer;
