import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaArrowRightLong } from 'react-icons/fa6';
import welcome from "../assets/images/welcome.svg"
import Sun from "../assets/images/sun.svg"
import pirate from "../assets/images/pirate.svg"

import { NavLink } from 'react-router-dom';

const WelcomeComponent = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const styles = {
    buttonPadding: {
      paddingRight: windowWidth <= 768 ? '0.9rem' : '2.8rem',
      paddingLeft: windowWidth <= 768 ? '0.9rem' : '2.8rem',
      paddingTop: '0.9rem',
      paddingBottom: '0.9rem',
      fontSize: "14px"
    },
  };

  return (
    <div className='d-flex flex-column align-items-center justify-content-center border' style={{ minHeight: "100vh", marginTop: "69px", padding: "50px 0px" }}>
      <div className=''>
        <p
          className='d-flex flex-column align-items-center justify-content-center'
          style={{
            fontFamily: "'Rampart One', cursive",
            fontWeight: 400,
            fontSize: "40px",
            lineHeight: "48px",
            letterSpacing: "5%",
            color: "rgba(63, 61, 86, 1)",
            marginBottom: "2px",
            width: "450px",
            height: "48px"
          }}
        >
          WELCOME DCODER!!
        </p>
        <div
          className='d-flex  align-items-center justify-content-center  '
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 500,
            fontSize: "31px",
            lineHeight: "40.8px",
            letterSpacing: "10%",
            color: "rgba(63, 61, 86, 1)",
            marginTop: "0.8rem"
          }}

        >
          <p>
            You are Part of our Grand Fleet
          </p>
          <img src={Sun} className='mb-2 ' style={{ marginLeft: "0.6rem" }} alt='Loading...' />
        </div>
      </div>
      <div
        className='d-flex align-items-center  flex-column'
        style={{
          background: "rgba(45, 52, 71, 1)",
          width: "766px",
          height: "429px",
          color: "white",
          borderRadius: "15px",
          border: "1px solid rgba(201, 201, 201, 1)",
          opacity: "1",
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          position: 'relative',
          overflow: 'hidden',
        }}>
        <div style={{ position: 'absolute', left: '-70px', top: '0px', backgroundColor: '#F937B326', borderRadius: '50%', filter: 'blur(100px)', height: '100%', width: '20%' }}></div>
        <img className='' style={{ height: "fit-content", minHeight: "285px", zIndex: '5' }} src={welcome} alt='Loading...' />

        <div className='d-flex  align-items-center justify-content-center  ' style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "rgba(255, 233, 77, 1)", fontWeight: 600, fontSize: "30px", letterSpacing: "0.05em", textAlign: "left", zIndex: '5' }}>
          <p>
            Let's Start with your First Quest!!
          </p>
          <img style={{ width: "3rem", marginBottom: "22px", marginLeft: "6px", }} src={pirate} alt='loading...' />
        </div>

        <NavLink to="/compiler">
          <Button
            variant=""
            style={{
              backgroundColor: "#9C50FF",
              color: "white",
              zIndex: '5',
              ...styles.buttonPadding,
            }}
            className=" border"
          >
            Let's Start
            <FaArrowRightLong />
          </Button>
        </NavLink>
      </div>
    </div>
  );
}

export default WelcomeComponent;
