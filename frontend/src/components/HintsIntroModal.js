import React from 'react';
import { BulbIcon } from '../assets/export';
import '../assets/styles/hintsIntroModal.css';

const HintsIntroModal = ({ setShowHintsModalIntro }) => {
    return (
        <div className="hintsIntro-modal">
            <div className="hintsIntro-modal-shape"></div>
            <div className="hintsIntro-modal-main">
                <img src={BulbIcon} alt="Buld-Icon" className="hintsIntro-modal-main-left" />
                <div className="hintsIntro-modal-main-right">
                    <h2 className="hintsIntro-modal-main-right-heading">Get HINTS</h2>
                    <p className="hintsIntro-modal-main-right-description">if you are Beginner!!</p>
                    <button className="hintsIntro-modal-main-right-btn" onClick={() => setShowHintsModalIntro(false)}>Ok</button>
                </div>
            </div>
        </div>
    )
}

export default HintsIntroModal;