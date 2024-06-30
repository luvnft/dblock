import React, { useState } from 'react';
import '../assets/styles/productBox.css';
import { CoinIcon, ProductHeartIcon, ProductHeartIconFilled } from '../assets/export';
import InsufficientCoinsModal from './InsufficientCoinsModal';
import ClaimRewardModal from './ClaimRewardModal';
import axios from 'axios';
import PurchaseConfirmationModal from './PurchaseConfirmationModal';

const ProductBox = ({ name, image, price, isWishlisted, index, productDetails, setProductDetails, claimFirstRewardModalOpen, setClaimFirstRewardModalOpen, link, setModalOpen }) => {
    const [insufficientCoinsModalOpen, setInsufficientCoinsModalOpen] = useState(false);
    const [showPurchaseConfirmationModal, setShowPurchaseConfirmationModal] = useState(false);

    const formatToK = (num) => {
        if (num >= 1000) {
            return Math.floor(num / 1000) + 'k';
        }
        return num.toString();
    };

    const handleHeartIconClick = () => {
        const updatedProductDetails = [...productDetails];
        updatedProductDetails[index].isWishlisted = !updatedProductDetails[index].isWishlisted;
        setProductDetails(updatedProductDetails);
    }

    const handleCoinClick = () => {
        setClaimFirstRewardModalOpen(false);
        setShowPurchaseConfirmationModal(true);
    }

    const handleBuyProduct = async () => {
        try {
            const Id = localStorage.getItem("USERID")
            const data = await axios.get(`https://backend-c40k.onrender.com/getUserId/${Id}`)
            // setCoin(data.data.fetchedData.points);
            if (parseInt(price) <= data.data.fetchedData.points) {
                await axios.patch(`https://backend-c40k.onrender.com/updateUser/${Id}`, {
                    points: data.data.fetchedData.points - parseInt(price)
                });
                setShowPurchaseConfirmationModal(false);
                window.open(link);
            }
            else {
                setInsufficientCoinsModalOpen(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={claimFirstRewardModalOpen && index === 1 ? "productBox-container active" : "productBox-container"}>
            {showPurchaseConfirmationModal && <PurchaseConfirmationModal setShowPurchaseConfirmationModal={setShowPurchaseConfirmationModal} handleBuyProduct={handleBuyProduct} setModalOpen={setModalOpen} />}
            {insufficientCoinsModalOpen && <InsufficientCoinsModal productName={name} setInsufficientCoinsModalOpen={setInsufficientCoinsModalOpen} />}

            {claimFirstRewardModalOpen && index === 1 && <ClaimRewardModal />}

            <div className="productBox-container-top">
                <img src={isWishlisted ? ProductHeartIconFilled : ProductHeartIcon} alt="Heart-Icon" className="productBox-container-top-heart-icon" onClick={handleHeartIconClick} />
                <div className="productBox-container-top-tag">HOT</div>
                <img src={image} alt="Product-Banner" className="productBox-container-top-image" />
                <div className="productBox-container-top-name">{name}</div>
            </div>

            <div className="productBox-container-bottom">
                <p className="productBox-container-bottom-title">Redeem for</p>
                <div className="productBox-container-bottom-btn" onClick={handleCoinClick}>
                    <img src={CoinIcon} alt="Coin-Icon" className="productBox-container-bottom-btn-icon" />
                    <p className="productBox-container-bottom-btn-text">{`${formatToK(price)}`}</p>
                </div>
            </div>
        </div>
    )
}

export default ProductBox;