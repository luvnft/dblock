import React from 'react';
import Navbar from '../components/Navbar';
import { Error404Banner } from '../assets/export';
import '../assets/styles/error.css';

const Error = () => {
    return (
        <>
            <Navbar />
            <div className="error-container">
                <div className="error-container-top">
                    <img src={Error404Banner} alt="Error-Banner" className="error-container-top-icon" />
                    <h3 className="error-container-top-heading">⛔ 404: Page Not Found ⛔ <br /> Oops! You've hit a dead end. 🚧💻</h3>
                </div>

                <div className="error-container-bottom">
                    <h5 className="error-container-bottom-heading">Here are a few things you can try:</h5>
                    <div className="error-container-bottom-description">
                        <p>1. <span>Check the URL:</span> Maybe there's a typo? Double-check the address you entered.</p>
                        <p>2. <span>Go Back:</span> Head back to the previous page and try a different link.</p>
                        <p>3. <span>Visit Our Homepage:</span> DcodeBlock Homepage</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Error;