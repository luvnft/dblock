import React from 'react';
import { CloseCircleIcon, DiscordIcon } from '../assets/export';
import '../assets/styles/discordModal.css';
import { NavLink } from 'react-router-dom';

const DiscordModal = ({ setShowFeedbackModal }) => {
    return (
        <div className="discord-modal">
            <div className="discord-modal-gradient"></div>
            <img src={CloseCircleIcon} alt="Close-Icon" className="discord-close-icon" onClick={() => setShowFeedbackModal(false)} />
            <img src={DiscordIcon} alt="Discord-Icon" className="discord-modal-icon" />
            <h3 className="discord-modal-heading">Do Join our <span className="discord-modal-heading-title">Discord</span> to SUPPORT us <br />  & get <span className="discord-modal-heading-description">Diamond NFT</span> for being an <br /> Awesome Initial User 😎</h3>

            <NavLink to="https://discord.com/invite/Np6BjSaXud" target="_blank" className="discord-modal-btn">
                <img src={DiscordIcon} alt="Discord-Icon" className="discord-modal-btn-icon" />
                <p className="discord-modal-btn-text">Join Discord</p>
            </NavLink>
        </div>
    )
}

export default DiscordModal;