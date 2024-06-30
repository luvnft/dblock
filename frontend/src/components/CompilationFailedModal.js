import React from 'react';
import { CloseCircleIcon, ErrorIcon } from '../assets/export';
import '../assets/styles/compilationFailedModal.css';

const CompilationFailedModal = ({ setShowerror }) => {
  return (
    <div className="compilationFailed-modal">
      <div className="compilationFailed-modal-gradient"></div>
      <img src={CloseCircleIcon} alt="Close-Icon" className="compilationFailed-close-icon" onClick={() => setShowerror(false)} />
      <img src={ErrorIcon} alt="Error-Icon" className="compilationFailed-modal-icon" />
      <h3 className="compilationFailed-modal-heading">⛔ Whoops! Compilation Failed ⛔</h3>
      <p className="compilationFailed-modal-description">Looks like you hit a wanted level error! 🚔💥</p>
      <button className="compilationFailed-modal-btn" onClick={() => setShowerror(false)}>Got it!</button>
    </div>
  )
}

export default CompilationFailedModal;