import React from 'react';
import { ClaimRewardBanner } from '../assets/export';
import '../assets/styles/claimRewardModal.css';

const ClaimRewardModal = ({type}) => {
    return (
        <div className="claimFirstReward-modal">
            <div className="claimReward-modal-overlay"></div>
            <div className="claimFirstReward-modal-shape"></div>
            <div className="claimFirstReward-modal-main">
                <img src={ClaimRewardBanner} alt="Claim-Reward" className="claimFirstReward-modal-main-banner" />
                <p className="claimFirstReward-modal-main-text">Try Claiming your First Reward!!</p>
            </div>
        </div>
    )
}

export default ClaimRewardModal;