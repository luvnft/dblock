import React from 'react';
import Navbar from '../components/Navbar';
import AboutComponent from '../components/AboutComponent';

const About = ({ currentUser }) => {
  return (
    <>
      <Navbar currentUser={currentUser} />
      <AboutComponent currentUser={currentUser} />
    </>
  )
}

export default About;
