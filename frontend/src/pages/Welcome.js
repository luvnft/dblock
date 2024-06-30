import React from 'react';
import Navbar from '../components/Navbar';
import WelcomeComponent from '../components/WelcomeComponent';
import Footer from '../components/Footer';
import CopyrightComponent from '../components/CopyrightComponent';

const Welcome = ({ currentUser }) => {
  return (
    <>
      <Navbar currentUser={currentUser} />
      <WelcomeComponent />
      <Footer />
      <CopyrightComponent />
    </>
  )
}

export default Welcome;