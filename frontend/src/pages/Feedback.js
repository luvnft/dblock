import React, { useState } from 'react';
import FeedbackModal from '../components/FeedbackModal';
import DiscordModal from '../components/DiscordModal';

const Feedback = ({setShowFeedbackModal}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [feedbackData, setFeedbackData] = useState({
        overallExperience: { rating: null, message: '' },
        compilerChallenges: { rating: null, message: '' },
        storeRewards: { rating: null, message: '' },
    });

    return (
        <div className="feedback-container">
            {activeStep === 0 && <FeedbackModal title="Thanks for being our First Initial users" description="How was your overall experience?" value="overallExperience" feedbackData={feedbackData} setFeedbackData={setFeedbackData} setActiveStep={setActiveStep} setShowFeedbackModal={setShowFeedbackModal} />}

            {activeStep === 1 && <FeedbackModal title="Thanks for being our First Initial users" description="What was your experience with Compiler Challenges?"  value="compilerChallenges" feedbackData={feedbackData} setFeedbackData={setFeedbackData} setActiveStep={setActiveStep} setShowFeedbackModal={setShowFeedbackModal} />}
            
            {activeStep === 2 && <FeedbackModal title="Thanks for being our First Initial users" description="Do you like Incentivization through Store?"  value="storeRewards" feedbackData={feedbackData} setFeedbackData={setFeedbackData} setActiveStep={setActiveStep} setShowFeedbackModal={setShowFeedbackModal} />}
            
            {activeStep === 3 && <DiscordModal setShowFeedbackModal={setShowFeedbackModal} />}
        </div>
    )
}

export default Feedback;