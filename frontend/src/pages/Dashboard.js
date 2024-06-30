import React, { useEffect, useState } from 'react';
import DashboardRewardModal from '../components/DashboardRewardModal';
import Footer from '../components/Footer';
import { CoinIcon, DashboardBanner, DashboardCartIcon, DashboardFeaturesBanner, DashboardLaptopIcon, DashboardReferralBanner, DashboardRewardsBanner, ReferIcon, RightArrowIcon } from '../assets/export';
import '../assets/styles/dashboard.css';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import Feedback from './Feedback';
import DashboardNavbar from '../components/DashboardNavbar';

const Dashboard = ({ showFeedbackModal, setShowFeedbackModal, isFeedbackRendered, setIsFeedbackRendered, currentUser, isNewUser, rewardModalOpen, setRewardModalOpen }) => {
    const [trailProblemsDetails, setTrailProblemsDetails] = useState([{}, {}, {}]);
    const [solvedProblemDetails, setSolvedProblemDetails] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (isNewUser && !rewardModalOpen) {
            setTimeout(() => {
                setModalOpen(true);
                setRewardModalOpen(true);
            }, 2000);
        }

        const fetchTrialProblemsData = async () => {
            try {
                const response = await axios.get("https://backend-c40k.onrender.com/AllProblem");
                setTrailProblemsDetails(response?.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTrialProblemsData();

        const updatePointsSystem = async () => {
            try {
                const Id = localStorage.getItem("USERID")
                const updatePoints = await axios.get(`https://backend-c40k.onrender.com/getUserId/${Id}`);
                if (updatePoints) {
                    setSolvedProblemDetails(updatePoints.data.fetchedData.solved);
                    if (updatePoints.data.fetchedData.ReferelCount % 3 === 0) {
                        const pointSystem = (updatePoints.data.fetchedData.ReferelCount / 3) * 10;
                        await axios.patch(`https://backend-c40k.onrender.com/updateUserByReferalPoints/${Id}`, {
                            points: pointSystem,
                            ReferelCount: 0
                        })
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        updatePointsSystem()
    }, [])

    const handleMouseLeave = () => {
        if (isFeedbackRendered === false && currentUser) {
            setIsFeedbackRendered(true);
            setTimeout(() => {
                setShowFeedbackModal(true);
            }, 10000);
        }
    }

    const handleReferalCode = async () => {
        try {
            const id = localStorage.getItem("USERID")
            const fetchedData = await axios.get(`https://backend-c40k.onrender.com/getUserId/${id}`)
            console.log(fetchedData);
            alert("Your Referal Code " + fetchedData.data.fetchedData.referalCode)
        } catch (error) {
            alert("Create Account")
        }
    }

    return (
        <div className="dashboard-container-wrapper">
            {showFeedbackModal && <Feedback setShowFeedbackModal={setShowFeedbackModal} />}
            <DashboardNavbar handleMouseLeave={handleMouseLeave} />

            <div className="dashboard-container-wrapper-main">
                {modalOpen && <div className="dashboard-container-overlay"></div>}

                <div className="dashboard-container">
                    <div className="dashboard-container-main">
                        <div className="left-dashboard-container-wrapper">
                            <div className="dashboard-container-title">
                                <h2 className="dashboard-container-title-text">Few Trial Problems</h2>
                                <img src={DashboardLaptopIcon} alt="Laptop-Icon" className="dashboard-container-title-icon" />
                            </div>

                            <div className="left-dashboard-container">
                                {modalOpen && <DashboardRewardModal setRewardModalOpen={setModalOpen} />}

                                <div className="left-dashboard-container-main">
                                    {trailProblemsDetails?.map((item, index) => (
                                        <div className="left-dashboard-container-box" key={index}>
                                            <div className="left-dashboard-container-box-top">
                                                <p className="left-dashboard-container-box-top-text"><strong>Theme:</strong> {item?.Theme}</p>
                                                <p className="left-dashboard-container-box-top-text"><strong>Subtheme:</strong> {item?.SubTheme}</p>
                                            </div>

                                            <div className="left-dashboard-container-box-middle">
                                                <div className="left-dashboard-container-box-middle-left">
                                                    <p className="left-dashboard-container-box-middle-left-text">Earn upto:</p>
                                                    <div className="left-dashboard-container-box-middle-left-reward">
                                                        <img src={CoinIcon} alt="Coin-Icon" className="left-dashboard-container-box-middle-left-reward-icon" />
                                                        {item?.Difficulty === 'Easy' ? '10' : item?.Difficulty === 'Medium' ? '20' : item?.Difficulty === 'Hard' ? '30' : ''} DC-credits
                                                    </div>
                                                </div>

                                                <div className={`left-dashboard-container-box-middle-right ${item?.Difficulty?.toLowerCase()}`}>{item?.Difficulty}</div>
                                            </div>

                                            <Link style={{ textDecoration: "none" }} to={item?.Url} className={`left-dashboard-container-box-btn ${solvedProblemDetails.includes(item?._id) ? "active" : ""}`}>
                                                {solvedProblemDetails.includes(item?._id) ? "Re-attempt" : "Let's Start"}
                                            </Link>
                                        </div>
                                    ))}
                                </div>

                                <div className="left-dashboard-container-title">More exciting Thematic Challenges</div>
                                <div className="left-dashboard-container-description">Coming soon!!</div>
                            </div>
                        </div>

                        <div className="right-dashboard-container">
                            <div className="right-dashboard-container-box">
                                <img src={DashboardReferralBanner} alt="Refferal-Banner" className="right-dashboard-container-box-left" />

                                <div className="right-dashboard-container-box-right">
                                    <h2 className="right-dashboard-container-box-right-heading">3 Referrals = 10 DC- Credits</h2>
                                    <p className="right-dashboard-container-box-right-description">Refer a friend and both of you earn DC-credits! Rewards for spreading the word. <br />Start referring today!</p>

                                    <div onClick={handleReferalCode} className="right-dashboard-container-box-right-btn-text">
                                        <div className="right-dashboard-container-box-right-btn">
                                            <img src={ReferIcon} alt="Refer-Icon" className="right-dashboard-container-box-right-btn-text-icon" />
                                            Refer now
                                            <img src={RightArrowIcon} alt="Right-Arrow-Icon" className="right-dashboard-container-box-right-btn-icon" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="right-dashboard-container-box rewardsBox">
                                <img src={DashboardRewardsBanner} alt="Rewards-Banner" className="right-dashboard-container-box-left" />

                                <div className="right-dashboard-container-box-right">
                                    <h2 className="right-dashboard-container-box-right-heading">Unlock Amazing Rewards <br /> with DC-Credits
                                        <img src={DashboardCartIcon} alt="Cart-Icon" className="right-dashboard-container-box-right-heading-icon" />
                                    </h2>
                                    <p className="right-dashboard-container-box-right-description">Don't miss out! Start earning and redeeming your credits for the latest tech, stylish merch, and more.</p>

                                    <div className="right-dashboard-container-box-right-btn">
                                        <NavLink to="/store" style={{ textDecoration: "none" }}>
                                            <div className="right-dashboard-container-box-right-btn-text">
                                                Earn your iPad
                                            </div>
                                        </NavLink>
                                        <img src={RightArrowIcon} alt="Right-Arrow-Icon" className="right-dashboard-container-box-right-btn-icon" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="video-container">
                    <img src={DashboardBanner} alt="Dashboard-Banner" className="video-container-left" />

                    <div className="video-container-right">
                        <h2 className="video-container-title">No more Text-heavy Docs & Long Videos</h2>
                        <p className="video-container-description">Master Web3 concepts effortlessly with <strong>Interactive Visuals & Personalized AI Guidance</strong>. Ditch boring tutorials, ask questions, and learn.</p>
                    </div>
                </div>
            </div>

            <div className="features-container">
                <div className="features-container-gradient"></div>
                <h2 className="features-container-title">Exciting New Features are on the Way!</h2>

                <div className="features-container-main">
                    <div className="features-container-main-left">
                        <div className="features-container-main-box">
                            <h2 className="features-container-main-box-heading">Animated Visual Learning:</h2>
                            <p className="features-container-main-box-description">Master Web3 concepts with interactive <br /> <span>Mind Maps, Diagrams, and Flowcharts</span></p>
                        </div>

                        <div className="features-container-main-box leftAlign">
                            <h2 className="features-container-main-box-heading">Earn Big:</h2>
                            <p className="features-container-main-box-description">Compete in <span>Contests and Hackathons</span> <br /> for major DC-Credit rewards.</p>
                        </div>
                    </div>

                    <div className="features-container-main-middle">
                        <img src={DashboardFeaturesBanner} alt="Features-Banner" className="features-container-main-middle-banner" />
                    </div>

                    <div className="features-container-main-left-mobile">
                        <div className="features-container-main-box">
                            <h2 className="features-container-main-box-heading">Animated Visual Learning:</h2>
                            <p className="features-container-main-box-description">Master Web3 concepts with interactive <br /> <span>Mind Maps, Diagrams, and Flowcharts</span></p>
                        </div>

                        <div className="features-container-main-box leftAlign">
                            <h2 className="features-container-main-box-heading">Earn Big:</h2>
                            <p className="features-container-main-box-description">Compete in <span>Contests and Hackathons</span> <br /> for major DC-Credit rewards.</p>
                        </div>
                    </div>

                    <div className="features-container-main-right">
                        <div className="features-container-main-box">
                            <h2 className="features-container-main-box-heading">Challenge Yourself, Have Fun:</h2>
                            <p className="features-container-main-box-description">Level up your skills with <span>more</span> expertly curated, <br /> fun Challenges</p>
                        </div>

                        <div className="features-container-main-box rightAlign">
                            <h2 className="features-container-main-box-heading">Beginner-Friendly Sandbox:</h2>
                            <p className="features-container-main-box-description">Get hands-on experience in a <span>Pre-Configured</span>, <br /> easy-to-use environment.</p>
                        </div>
                    </div>
                </div>

                <div className="features-container-main-box littleLeftAlign">
                    <h2 className="features-container-main-box-heading">Get Hired:</h2>
                    <p className="features-container-main-box-description">Showcase your Skills and get <span>Connected</span> <br /> with top Web3 employers.</p>
                </div>

                <p className="features-container-description">All in one platform to get from Zero to Hero in web3!</p>
            </div>

            <Footer />
        </div>
    )
}

export default Dashboard;