import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Footer from '../components/Footer';
import '../assets/styles/home.css';

const Home = ({ currentUser }) => {
  return (
    <>
      <Navbar currentUser={currentUser} />
      <Hero />
      <HowItWorks />
      <Footer />
    </>
  );
};

export default Home;
