import React from 'react';
import { FreeCanvaPremiumBanner } from '../assets/export';
import '../assets/styles/dashboardRewardModal.css';

const DashboardRewardModal = ({ setRewardModalOpen }) => {
    return (
        <div className="dashboardReward-modal">
            <div className="dashboardReward-modal-overlay"></div>
            <div className="dashboardReward-modal-shape"></div>
            <div className="dashboardReward-modal-main">
                <img src={FreeCanvaPremiumBanner} alt="Reward-Banner" className="dashboardReward-modal-main-left" />
                <div className="dashboardReward-modal-main-right">
                    <p className="dashboardReward-modal-main-right-text">Solve all <br /> 3 Challenges to get <br /> <strong>FREE Canva Premium!!</strong></p>
                    <div className="dashboardReward-modal-main-right-btn" onClick={() => setRewardModalOpen(false)}>Okay</div>
                </div>
            </div>
        </div>
    )
}

export default DashboardRewardModal;