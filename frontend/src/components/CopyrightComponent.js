import React from 'react';
import { FaTwitter, FaLinkedin, FaDiscord, FaGithub } from "react-icons/fa6";
import { FiYoutube } from "react-icons/fi";
import '../assets/styles/copyright.css';

const CopyrightComponent = () => {
    return (
        <div className="copyright-container">
            <p className="copyright-container-left">Copyright © 2024 DcodeBlock. <span>All rights reserved.</span></p>

            <div className="copyright-container-right">
                <a href="/"><FaTwitter /></a>
                <a href="/"><FaLinkedin /></a>
                <a href="/"><FaDiscord className="copyright-container-right-discord-icon" /></a>
                <a href="/"><FaGithub /></a>
                <a href="/"><FiYoutube /></a>
            </div>
        </div>
    )
}

export default CopyrightComponent;