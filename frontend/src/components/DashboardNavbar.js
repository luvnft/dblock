import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Logo, CoinIcon, ProfileIcon, DiscordIcon } from '../assets/export';
import '../assets/styles/compilerNavbar.css';
import axios from 'axios';

const DashboardNavbar = ({ handleMouseLeave }) => {
    const [coin, setCoin] = useState(0)

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
                    <NavLink to="https://discord.com/invite/Np6BjSaXud" target="_blank" className="right-compilerNavbar-container-left">
                        <img src={DiscordIcon} alt="Discord-Icon" className="discord-icon" />
                        <p className="discord-text">Join Discord</p>
                    </NavLink>

                    <div className="right-compilerNavbar-container-middle">
                        <img src={CoinIcon} alt="Coin-Icon" className="coin-icon" />
                        <p className="coin-text">{coin}</p>
                    </div>

                    <div className="right-compilerNavbar-container">
                        <NavLink to="/AI" style={{textDecoration:"none"}}>
                        <p className="coin-text" style={{textDecoration:"none"}}>AI Learning</p>
                        </NavLink>
                    </div>

                    <div className="right-compilerNavbar-container-right">
                        <img src={ProfileIcon} alt="Profile-Icon" className="profile-icon" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardNavbar;
