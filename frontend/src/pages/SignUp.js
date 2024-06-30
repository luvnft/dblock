import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CopyrightComponent from '../components/CopyrightComponent';
import { GithubIcon, GoogleIcon, Logo } from '../assets/export';
import CustomModal from "../lib/CustomModal"
import '../assets/styles/signUp.css';
import { auth } from "../lib/firebase/firebase";
import {
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";

const SignUp = ({ currentUser, setCurrentUser, setIsNewUser }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', email: '', password: '', recaptchaValue: '', referalCodeType: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [modelCode, setModelCode] = useState('')
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState({ usernameError: null, emailError: null, passwordError: null });

    const handleOnChange = (e) => {
        setFormError({ usernameError: null, emailError: null, passwordError: null });
        setFormData({ ...formData, [e.target.id]: e.target.value });

        if (e.target.id === "username" && e.target.value !== "") {
            if (!(/^[a-z0-9_]+$/.test(e.target.value))) {
                setFormError({ ...formError, usernameError: 'Invalid Username' });
            }
        }
        else if (e.target.id === "email" && e.target.value !== "") {
            if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value))) {
                setFormError({ ...formError, emailError: 'Invalid Email' });
            }
        }
        else if (e.target.id === "password" && e.target.value !== "") {
            if (!(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(e.target.value))) {
                setFormError({ ...formError, passwordError: 'Invalid Password' });
            }
        }
    }

    const doSignInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log(user);
        try {
            const data = await axios.post('https://backend-c40k.onrender.com/createUser', {
                userName: user.displayName,
                email: user.email,
                password: user.email,
                referalCodeType: ""
            });
            if (localStorage.getItem("USERID")) {
                localStorage.removeItem("USERID");
            }
            localStorage.setItem("USERID", data.data._id);
            window.location.replace("/about");
        } catch (error) {
            alert('User already exists. Please choose a different username or email.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!(formError.usernameError || formError.emailError || formError.passwordError)) {
            if (formData.recaptchaValue) {
                try {
                    setLoading(true);
                    const data = await axios.post('https://backend-c40k.onrender.com/createUser', {
                        userName: formData.username,
                        email: formData.email,
                        password: formData.password,
                        referalCodeType: formData.referalCodeType
                    });
                    setLoading(false);

                    setModalTitle('Congratulations');
                    setModalMessage(`Congratulations on registering. You can refer your friends with this code and earn DCB coins:`);
                    setModelCode(data.data.referalCode);
                    setShowModal(true);
                    if (localStorage.getItem("USERID")) {
                        localStorage.removeItem("USERID");
                    }
                    localStorage.setItem("USERID", data.data._id);
                    setCurrentUser(true);
                    localStorage.setItem('IsNewUser', "No");
                    setIsNewUser(true);
                    navigate('/about');
                } catch (error) {
                    if (error.response.status === 409) {
                        setLoading(false);
                        alert('User already exists. Please choose a different username or email.');
                    } else {
                        // Handle other errors
                        setModalTitle('Error');
                        setModalMessage(error.response.data);
                        setShowModal(true);
                        setLoading(false);
                    }
                }
            } else {
                setModalTitle('Error');
                setModalMessage('Please complete the CAPTCHA');
                setShowModal(true);
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        const updatePointsSystem = async () => {
            try {
                const Id = localStorage.getItem("USERID")
                const updatePoints = await axios.get(`https://backend-c40k.onrender.com/getUserId/${Id}`)
                if (updatePoints) {
                    if (updatePoints.data.fetchedData.ReferelCount % 3 === 0) {
                        const pointSystem = (updatePoints.data.fetchedData.ReferelCount / 3) * 10

                        await axios.patch(`https://backend-c40k.onrender.com/updateUserByReferalPoints/${Id}`, {
                            points: pointSystem,
                            ReferelCount: 0
                        })
                    }
                }
            } catch (error) {

            }
        }
        updatePointsSystem()
    }, [])

    return (
        <>
            {loading && <Loader />}
            <Navbar currentUser={currentUser} />

            <div className='signUp-container-wrapper'>
                <div className="signUp-container">
                    <img src={Logo} alt="DcodeBlock-Logo" className="signUp-container-logo" />

                    <div className="signUp-container-main">
                        <div className="signUp-container-main-left">
                            <div className="signUp-container-main-left-btn" onClick={() => doSignInWithGoogle()}>
                                <img src={GoogleIcon} alt="Google-Icon" className="signUp-container-main-left-btn-icon" />
                                <p className="signUp-container-main-left-btn-text">Create Account using Google</p>
                            </div>

                            <div className="signUp-container-main-left-btn">
                                <img src={GithubIcon} alt="Github-Icon" className="signUp-container-main-left-btn-icon" />
                                <p className="signUp-container-main-left-btn-text">Create Account using Github</p>
                            </div>

                            <p className="signUp-container-main-left-or">OR</p>
                            <div className="signUp-container-bottom">Already have an Account? <NavLink to='/login'>Sign-in</NavLink></div>
                        </div>

                        <div className="signUp-container-main-middle"></div>

                        <div className="signUp-container-main-right">
                            <div className="signUp-container-input-wrapper">
                                <div className="signUp-container-input-box">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" placeholder='Enter your Email' value={formData.email} onChange={handleOnChange} style={formError.emailError && { color: "red" }} />
                                </div>

                                <div className="signUp-container-input-box">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" id="username" placeholder='Enter your Username' value={formData.username} onChange={handleOnChange} style={formError.usernameError && { color: "red" }} />
                                </div>

                                <div className="signUp-container-input-box">
                                    <label htmlFor="password">Create Password</label>
                                    <div className="signUp-container-input-box-wrapper">
                                        <input type={showPassword ? "text" : "password"} id="password" placeholder='Create your Password' value={formData.password} onChange={handleOnChange} style={formError.passwordError && { color: "red" }} />

                                        {showPassword ? <FaEye onClick={() => setShowPassword(!showPassword)} /> : <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />}
                                    </div>
                                </div>

                                <div className="signUp-container-input-box">
                                    <label htmlFor="referalCodeType">Referral Code <span>{`( If You Have One )`}</span></label>
                                    <input type="text" id="referalCodeType" placeholder='Enter Referral Code' value={formData.referalCodeType} onChange={handleOnChange} />
                                </div>

                                <div className="signUp-container-input-box">
                                    <label htmlFor="verify">Verify</label>
                                    <ReCAPTCHA
                                        className="signUp-container-recaptcha"
                                        sitekey="6Lc63O8pAAAAAOC8myTwSWBi4BVQCPOqU8yUP4l_"
                                        onChange={(e) => setFormData({ ...formData, recaptchaValue: e })}
                                    />
                                </div>
                            </div>

                            <div className="signUp-container-btn" onClick={handleSubmit} style={(formError.usernameError || formError.emailError || formError.passwordError) && { cursor: "not-allowed" }}>Register</div>
                        </div>
                    </div>
                </div>
            </div>

            <CustomModal show={showModal} title={modalTitle} message={modalMessage} code={modelCode} onClose={() => setShowModal(false)} />
            <Footer />
            <CopyrightComponent />
        </>
    )
}

export default SignUp;
