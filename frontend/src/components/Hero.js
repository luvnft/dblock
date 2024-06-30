import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";
import { HeroBg, CoinIcon } from '../assets/export';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <div className="hero-container">
            <video className="video-background" autoPlay loop muted>
                <source src={HeroBg} type="video/mp4" />
            </video>

            <div className="hero-container-gradient"></div>
            <div className="hero-container-main">
                <div className="hero-container-main-top">
                    <h1 className="hero-container-main-top-heading">
                        Learn To Build in Web3.
                        <br />
                        Earn as You Grow <img src={CoinIcon} alt="Coin-Icon" className="hero-container-main-top-heading-icon" />
                    </h1>
                </div>

                <div className="hero-container-main-middle">
                    <h6 className="hero-container-main-middle-subheading">LEARN . CODE .  BUILD . EARN</h6>
                    <p className="hero-container-main-middle-paragraph">Why to Pay for Learning. <strong>GET PAID</strong> for Learning with our expertly curated Gamified Challenges and Beginner friendly Pre-Configured Sandbox Environment</p>
                </div>

                <div className="hero-container-main-bottom">
                    <div className="hero-container-main-bottom-btns-wrapper">
                        <button className="hero-container-main-bottom-btn signUp-btn" onClick={() => navigate('/sign-up')}>
                            <p>Sign up</p>
                            <FaArrowRightLong />
                        </button>

                        <NavLink style={{ textDecoration: "none" }} to="https://discord.com/invite/Np6BjSaXud" target="_blank">
                            <button className="hero-container-main-bottom-btn discord-btn" >
                                <FaDiscord />
                                <p>Join Discord</p>
                            </button>
                        </NavLink>
                    </div>
                    <p className="hero-container-main-bottom-text">Join our Waitlist!</p>
                </div>
            </div>
        </div>
    )
}

export default Hero;