import React from 'react';
import { CloseCircleIcon, SuccessIcon } from '../assets/export';
import '../assets/styles/compilationSuccessModal.css';

const CompilationSuccessModal = ({ setShowSucess }) => {
  return (
    <div className="compilationSuccess-modal">
      <div className="compilationSuccess-modal-gradient"></div>
      <img src={CloseCircleIcon} alt="Close-Icon" className="compilationSuccess-close-icon" onClick={() => setShowSucess(false)} />
      <img src={SuccessIcon} alt="Success-Icon" className="compilationSuccess-modal-icon" />
      <h3 className="compilationSuccess-modal-heading">Mission Accomplished! <br /> Compilation Successful✅</h3>
      <button className="compilationSuccess-modal-btn" onClick={() => setShowSucess(false)}>Got it!</button>
    </div>
  )
}

export default CompilationSuccessModal;