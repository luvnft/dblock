import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CopyrightComponent from '../components/CopyrightComponent';
import CompleteQuest from '../components/CompleteQuest';

const Alert = ({ currentUser }) => {
  return (
    <>
      <Navbar currentUser={currentUser} />
      <CompleteQuest />
      <Footer />
      <CopyrightComponent />
    </>
  )
}

export default Alert;