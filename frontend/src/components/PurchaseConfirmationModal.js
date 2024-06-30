import React from 'react';
import { CloseCircleIcon, PurchaseConfirmationModalBanner } from '../assets/export';
import '../assets/styles/purchaseConfirmationModal.css';

const PurchaseConfirmationModal = ({ setShowPurchaseConfirmationModal, handleBuyProduct, setModalOpen }) => {
    const handleCancelPurchase = () => {
        setShowPurchaseConfirmationModal(false);
        setModalOpen(false);
    }

    return (
        <div className="purchaseConfirmation-modal-wrapper">
            <div className="purchaseConfirmation-modal">
                <img src={CloseCircleIcon} alt="Close-Icon" className="purchaseConfirmation-modal-close-icon" onClick={handleCancelPurchase} />
                <img src={PurchaseConfirmationModalBanner} alt="Purchase-Confirmation-Banner" className="purchaseConfirmation-modal-icon" />

                <h3 className="purchaseConfirmation-modal-heading">Do you want to Purchase it</h3>
                <div className="purchaseConfirmation-modal-btn-wrapper">
                    <button className="cancelPurchase-btn" onClick={handleCancelPurchase}>Cancel</button>
                    <button className="buyPurchase-btn" onClick={handleBuyProduct}>Yes</button>
                </div>
            </div>
        </div>
    )
}

export default PurchaseConfirmationModal;