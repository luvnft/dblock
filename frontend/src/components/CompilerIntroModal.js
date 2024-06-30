import React from 'react';
import { InfoCircleIcon, SuccessIcon, ErrorIcon } from '../assets/export';
import '../assets/styles/compilerIntroModal.css';

const CompilerIntroModal = ({ introType, setCompilerQuickStartStep }) => {
    const handleQuickStart = () => {
        if (introType === "questSection") {
            setCompilerQuickStartStep(1);
        }
        else if (introType === "compilerSection") {
            setCompilerQuickStartStep(2);
        }
        else if (introType === "compileButton") {
            setCompilerQuickStartStep(3);
        }
        else if (introType === "submitButton") {
            setCompilerQuickStartStep(4);
        }
        else if (introType === "contractOutput") {
            setCompilerQuickStartStep(5);
        }
        else {
            setCompilerQuickStartStep(-1);
        }
    }

    return (
        <div className={`compilerIntro-modal ${introType}`}>
            <div className="compilerIntro-modal-shape"></div>

            <img src={introType === 'compileButton' ? ErrorIcon : introType === 'submitButton' ? SuccessIcon : InfoCircleIcon} alt={introType === 'compileButton' ? "Warning-Icon" : introType === 'submitButton' ? "Success-Icon" : "Info-Icon"} className="compilerIntro-modal-icon" />
            <div className="compilerIntro-modal-right">
                <h3 className="compilerIntro-modal-right-title">
                    {introType === 'questSection' ? "This is Quest Section" : introType === 'compilerSection' ? "Compiler to build Smart Contract" : introType === 'compileButton' ? "To Check Syntax error" : introType === 'submitButton' ? "Submit to Deploy Smart Contract" : introType === 'contractOutput' ? "Write the Name of Smart Contract" : "Returns the Famous Dialogue"}
                </h3>
                <button className="compilerIntro-modal-right-btn" onClick={handleQuickStart}>OK</button>
            </div>
        </div>
    )
}

export default CompilerIntroModal;