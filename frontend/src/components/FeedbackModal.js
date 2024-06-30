import React, { useState } from 'react';
import '../assets/styles/feedbackModal.css';
import { VeryGoodExperienceIcon, GoodExperienceIcon, ModerateExperienceIcon, BadExperienceIcon, VeryBadExperienceIcon, FeedbackIconOrange, RightArrowIconBlue } from '../assets/export';

const FeedbackModal = ({ title, description, value, feedbackData, setFeedbackData, setActiveStep, setShowFeedbackModal }) => {
    const [modalRating, setModalRating] = useState(null);
    const [modalMessage, setModalMessage] = useState(null);

    const handleSubmit = () => {
        const updatedFeedbackData = { ...feedbackData };
        updatedFeedbackData[value] = { modalRating, modalMessage };
        setFeedbackData(updatedFeedbackData);

        if (value === "overallExperience") {
            setActiveStep(1);
        }
        else if (value === "compilerChallenges") {
            setActiveStep(2);
        }
        else if (value === "storeRewards") {
            setActiveStep(3);
        }
    }

    return (
        <div className="feedback-modal">
            <div className="feedback-modal-gradient"></div>
            <div className="feedback-modal-skip" onClick={() => setShowFeedbackModal(false)}>skip&gt;&gt;</div>
            <div className="feedback-modal-title">{title}</div>
            <div className="feedback-modal-description">{description}</div>

            <div className="feedback-modal-main">
                <img src={VeryGoodExperienceIcon} alt="Very-Good-Experience-Icon" className={modalRating === "Very Good" ? "feedback-modal-main-icon active" : "feedback-modal-main-icon"} onClick={() => setModalRating("Very Good")} />
                <img src={GoodExperienceIcon} alt="Good-Experience-Icon" className={modalRating === "Good" ? "feedback-modal-main-icon active" : "feedback-modal-main-icon"} onClick={() => setModalRating("Good")} />
                <img src={ModerateExperienceIcon} alt="Moderate-Experience-Icon" className={modalRating === "Moderate" ? "feedback-modal-main-icon active" : "feedback-modal-main-icon"} onClick={() => setModalRating("Moderate")} />
                <img src={BadExperienceIcon} alt="Bad-Experience-Icon" className={modalRating === "Bad" ? "feedback-modal-main-icon active" : "feedback-modal-main-icon"} onClick={() => setModalRating("Bad")} />
                <img src={VeryBadExperienceIcon} alt="Very-Bad-Experience-Icon" className={modalRating === "Very Bad" ? "feedback-modal-main-icon active" : "feedback-modal-main-icon"} onClick={() => setModalRating("Very Bad")} />
            </div>

            <div className="feedback-modal-bottom">
                <div className="feedback-modal-bottom-left">
                    <img src={FeedbackIconOrange} alt="Feedback-Icon" className="feedback-modal-bottom-left-icon" />
                    <input type="text" className="feedback-modal-bottom-left-text" placeholder='Leave a Feedback' onChange={(e) => setModalMessage(e.target.value)} />
                </div>

                <img src={RightArrowIconBlue} alt="Right-Arrow-Icon" className="feedback-modal-bottom-right" onClick={handleSubmit} />
            </div>
        </div>
    )
}

export default FeedbackModal;