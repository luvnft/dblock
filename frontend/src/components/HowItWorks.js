import React from 'react';
import { LearnBanner, LearnIcon, BuildBanner, BuildIcon, EarnBanner, EarnIcon, CurvedLeftArrowIcon, CurvedRightArrowIcon } from '../assets/export';

const HowItWorks = () => {
    return (
        <div className="howItWorks-container">
            <div className="howItWorks-container-top-center-gradient"></div>
            <div className="howItWorks-container-left-bottom-gradient"></div>
            <div className="howItWorks-container-right-bottom-gradient"></div>

            <h1 className="howItWorks-container-heading">How it Works</h1>
            <div className="howItWorks-container-main">
                <div className="howItWorks-container-main-box">
                    <img src={LearnBanner} alt="Learn-Banner" className="howItWorks-container-main-box-banner" />
                    <img src={LearnIcon} alt="Learn-Icon" className="howItWorks-container-main-box-icon" />
                    <p className="howItWorks-container-main-box-text">through <br /> Personlized AI Guidance <br /> & Animated Diagrams.</p>
                </div>

                <div className="howItWorks-container-main-box bottom-box">
                    <img src={CurvedLeftArrowIcon} alt='Left-Arrow-Icon' className="bottom-box-left-arrow" />

                    <div className="bottom-box-main">
                        <img src={BuildBanner} alt="Build-Banner" className="howItWorks-container-main-box-banner" />
                        <img src={BuildIcon} alt="Build-Icon" className="howItWorks-container-main-box-icon" />
                        <p className="howItWorks-container-main-box-text">on Network Chains in Pre-configured Sandbox</p>
                    </div>

                    <img src={CurvedRightArrowIcon} alt='Right-Arrow-Icon' className="bottom-box-right-arrow" />
                </div>

                <div className="howItWorks-container-main-box">
                    <img src={EarnBanner} alt="Earn-Banner" className="howItWorks-container-main-box-banner" />
                    <img src={EarnIcon} alt="Earn-Icon" className="howItWorks-container-main-box-icon" />
                    <p className="howItWorks-container-main-box-text">by DC- Credits which are Redeemable in Store</p>
                </div>
            </div>
        </div>
    )
}

export default HowItWorks; 