import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Logo, CoinIcon, ProfileIcon } from '../assets/export';
import '../assets/styles/compilerNavbar.css';
import axios from 'axios';

const CompilerNavbar = ({ handleMouseLeave }) => {
    const [coin, setCoin] = useState(0);

    useEffect(() => {
        const fetchedData = async () => {
            try {
                const Id = localStorage.getItem("USERID")
                const data = await axios.get(`https://backend-c40k.onrender.com/getUserId/${Id}`)
                setCoin(data.data.fetchedData.points);
            } catch (error) {
                console.log(error);
            }
        }
        fetchedData()
    }, [])

    return (
        <div className="compilerNavbar-container" onMouseLeave={handleMouseLeave}>
            <NavLink to='/' className='left-compilerNavbar-container'>
                <img src={Logo} alt="DcodeBlock-Logo" className="compilerNavbar-logo" />
            </NavLink>

            <div>
                <div className='right-compilerNavbar-container'>
                    <NavLink to="/" className="right-compilerNavbar-container-left">
                        <p className="discord-text">Go to Dashboard</p>
                    </NavLink>

                    <div className="right-compilerNavbar-container-middle">
                        <img src={CoinIcon} alt="Coin-Icon" className="coin-icon" />
                        <p className="coin-text">{coin}</p>
                    </div>

                    <div className="right-compilerNavbar-container-right">
                        <img src={ProfileIcon} alt="Profile-Icon" className="profile-icon" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompilerNavbar;
