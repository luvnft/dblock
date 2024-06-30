import React, { useState } from 'react';
import { BulbIcon, CloseCircleIcon } from '../assets/export';
import '../assets/styles/hintsModal.css';

const HintsModal = ({ show, title, message, onClose, code }) => {
    const [currentHintIndex, setCurrentHintIndex] = useState(0);

    const handleShowBackHint = () => {
        if (message && message.length > 0) {
            if (currentHintIndex - 1 < 0) {
                setCurrentHintIndex(message.length - 1);
            }
            else {
                setCurrentHintIndex((prevIndex) => (prevIndex - 1) % message.length);
            }
        }
    }

    const handleShowNextHint = () => {
        if (message && message.length > 0) {
            setCurrentHintIndex((prevIndex) => (prevIndex + 1) % message.length);
        }
    };

    if (!show) {
        return null; // Render nothing if show is false
    }

    return (
        <div className="hints-modal">
            <div className="hints-modal-gradient"></div>
            <img src={CloseCircleIcon} alt="Close-Icon" onClick={onClose} className="hints-modal-close-icon" />
            <img src={BulbIcon} alt="Bulb-Icon" className="hints-modal-icon" />
            <p className="hints-modal-title">Looks like you called in some backup! <br /> Here's a clue to get you back on track. 🚓✨</p>

            <div className="hints-modal-main">
                <p className="hints-modal-main-left">Hint : {currentHintIndex + 1}</p>
                {message && message.length > 0 ? (
                    <p className="hints-modal-main-right">{message[currentHintIndex]}</p>
                ) : (
                    <p>No hints available.</p>
                )}
            </div>

            <div className="hints-modal-btn-wrapper">
                {message && message.length > 0 && (
                    <div className="primary_btn" onClick={handleShowBackHint}>&lt;&lt; BACK</div>
                )}
                {message && message.length > 0 && (
                    <div className="primary_btn" onClick={handleShowNextHint}>NEXT &gt;&gt;</div>
                )}
                <div className="secondary_btn" onClick={onClose}>OK!</div>
            </div>
        </div>
    );
}

export default HintsModal;
