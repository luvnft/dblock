import React from 'react';
import { CloseIconWhite, CoinIcon, Logo } from '../assets/export';
import '../assets/styles/problemSolvedModal.css';
import { NavLink } from 'react-router-dom';

const ProblemSolvedModal = ({ setProblemSolvedSuccess, reward, url }) => {
    return (
        <div className="problemSolved-modal-wrapper">
            <div className="problemSolved-modal">
                <img src={CloseIconWhite} alt="Close-Icon" className="problemSolved-modal-close-icon" onClick={() => setProblemSolvedSuccess(false)} />
                <img src={Logo} alt="DcodeBlock-Logo" className="problemSolved-modal-logo-icon" />
                <img src={CoinIcon} alt="Coin-Icon" className="problemSolved-modal-coin-icon" />
                <p className="problemSolved-modal-points">+{reward}<br />DC-credits</p>
                <NavLink to={url}>
                    <button className="problemSolved-modal-btn" onClick={() => setProblemSolvedSuccess(false)}>Great!</button>
                </NavLink>
            </div>
        </div>
    )
}

export default ProblemSolvedModal;