import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CopyrightComponent from '../components/CopyrightComponent';
import { GithubIcon, GoogleIcon, Logo } from '../assets/export';
import '../assets/styles/login.css';
import axios from 'axios';
import Loader from '../components/Loader';
import { auth } from "../lib/firebase/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = ({ currentUser }) => {
    const [formData, setFormData] = useState({ username: '', password: '', rememberMe: false });
    const [formError, setFormError] = useState({ usernameError: null, passwordError: null });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOnChange = (e) => {
        setFormError({ usernameError: null, passwordError: null });
        setFormData({ ...formData, [e.target.id]: e.target.value });

        if (e.target.id === "username" && e.target.value !== "") {
            if (!(/^[a-z0-9_]+$/.test(e.target.value))) {
                setFormError({ ...formError, usernameError: 'Invalid Username' });
            }
        }
        else if (e.target.id === "password" && e.target.value !== "") {
            if (!(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(e.target.value))) {
                setFormError({ ...formError, passwordError: 'Invalid Password' });
            }
        }
    };

    const doSignInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const userNamei = user.displayName;
        const passwordi = user.email

        if (user) {

            try {
                const response = await axios.post('https://backend-c40k.onrender.com/login', {
                    username: userNamei,
                    password: passwordi,
                });
             
                // Check if the user ID is already present in local storage
                const existingUserId = localStorage.getItem("USERID");
                // Set the new user ID in local storage
                if (existingUserId) {
                    // If present, remove the existing user ID
                    localStorage.removeItem("USERID");
                }
                localStorage.setItem("USERID", response.data.user._id);
    
                // alert("Login successful!");
                setLoading(false)
                window.location.replace("/about");
            } catch (error) {
                alert("Invalid username or password");
            }
  
   

        }
        else {
            alert("not found")
        }
    };

    const handleSubmit = async () => {
        if (!(formError.usernameError || formError.passwordError)) {
            try {
                setLoading(true);
                const response = await axios.post('https://backend-c40k.onrender.com/login', {
                    username: formData.username,
                    password: formData.password,
                });

                if (response.data.user) {
                    // Check if the user ID is already present in local storage
                    const existingUserId = localStorage.getItem("USERID");
                    // Set the new user ID in local storage
                    if (existingUserId) {
                        // If present, remove the existing user ID
                        localStorage.removeItem("USERID");
                    }
                    localStorage.setItem("USERID", response.data.user._id);

                    alert("Login successful!");
                    setLoading(false)
                    window.location.replace("/about");
                } else {
                    setLoading(false)
                    alert("Invalid username or password");
                }
            } catch (error) {
                console.error('Error during login:', error); // Log the error
                setLoading(false)
                alert("Invalid username or password");
            }
        }
    };

    return (
        <>
            {loading && <Loader />}
            <Navbar currentUser={currentUser} />

            <div className='login-container-wrapper'>
                <div className="login-container">
                    <img src={Logo} alt="DcodeBlock-Logo" className="login-container-logo" />

                    <div className="login-container-input-wrapper">
                        <div className="login-container-input-box">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" placeholder='Enter your Username' value={formData.username} onChange={handleOnChange} style={formError.usernameError && { color: "red" }} />
                        </div>

                        <div className="login-container-input-box">
                            <label htmlFor="password">Password</label>
                            <div className="signUp-container-input-box-wrapper">
                                <input type={showPassword ? "text" : "password"} id="password" placeholder='Create your Password' value={formData.password} onChange={handleOnChange} style={formError.passwordError && { color: "red" }} />

                                {showPassword ? <FaEye onClick={() => setShowPassword(!showPassword)} /> : <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />}
                            </div>
                        </div>
                    </div>

                    <div className="login-container-password-wrapper">
                        <div className="login-container-password-left">
                            <input type="checkbox" id="remember-me" checked={formData.rememberMe} onChange={() => setFormData({ ...formData, rememberMe: !formData.rememberMe })} />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <NavLink to="/forgot-password" className="login-container-password-right">Forgot Password?</NavLink>
                    </div>

                    <button className="login-container-btn" onClick={handleSubmit} style={(formError.usernameError || formError.passwordError) && { cursor: "not-allowed" }}>Login</button>

                    <div className="login-container-auth-wrapper">
                        <div className="login-container-auth-divider"></div>
                        <div className="login-container-auth-text">or continue with</div>
                        <div className="login-container-auth-main">
                            <img src={GoogleIcon} onClick={() => doSignInWithGoogle()} alt="Google-Icon" className="login-container-auth-google" />
                            <img src={GithubIcon} alt="Github-Icon" className="login-container-auth-github" />
                        </div>
                    </div>

                    <div className="login-container-bottom">Don't have an Account? <NavLink to='/sign-up'>Sign-up</NavLink></div>
                </div>
            </div>

            <Footer />
            <CopyrightComponent />
        </>
    );
};

export default Login;
