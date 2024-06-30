import React from 'react';
import { CloseIconWhite, CoinIcon, RightArrowIcon, WarningIcon } from '../assets/export';
import '../assets/styles/insufficientCoinsModal.css';
import { NavLink } from 'react-router-dom';

const InsufficientCoinsModal = ({ productName, setInsufficientCoinsModalOpen }) => {
    return (
        <div className="insufficientCoins-modal-wrapper">
            <div className="insufficientCoins-modal">
                <img src={CloseIconWhite} alt="Close-Icon" className="insufficientCoins-modal-close-icon" onClick={() => setInsufficientCoinsModalOpen(false)} />
                <img src={WarningIcon} alt="Warning-Icon" className="insufficientCoins-modal-warning-icon" />
                
                <p className="insufficientCoins-modal-title">OOPS!!<br />Insufficient DC-credits <img src={CoinIcon} alt="Coin-Icon" className="insufficientCoins-modal-title-icon" /></p>
                <p className="insufficientCoins-modal-description">SOLVE MORE QUESTS to UNLOCK {productName}</p>

                <div className="insufficientCoins-modal-btn" onClick={() => setInsufficientCoinsModalOpen(false)}>
                    <NavLink to='/' style={{textDecoration:"none"}}>
                    <p className="insufficientCoins-modal-btn-text">Solve more</p>
                    </NavLink>
                    <img src={RightArrowIcon} alt="Right-Arrow-Icon" className="insufficientCoins-modal-btn-icon" />
                </div>
            </div>
        </div>
    )
}

export default InsufficientCoinsModal;