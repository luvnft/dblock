import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Vector from "../assets/images/Vector.svg";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../assets/styles/About.css"
import { useNavigate } from 'react-router-dom';
import { AboutIcon1, AboutIcon2, AboutIcon3, RightArrowIconBlue } from '../assets/export';
import axios from 'axios';

const AboutComponent = () => {
  const navigate = useNavigate()
  const [education, setEducation] = useState(true);
  const [experience, setExperience] = useState(false);
  const [familirity, setFamilirity] = useState(false);

  const [clickedButton, setClickedButton] = useState(null);
  const [clickedExperience, setClickedExperience] = useState(null);
  const [clickedFamilirity, setClickedFamilirity] = useState(null);

  const handleButtonClick = (button) => {
    setClickedButton(button);
  };

  const handleButtonClickExperience = (button) => {
    setClickedExperience(button);
  };

  const handleButtonClickFamilirity = (button) => {
    setClickedFamilirity(button);
  };

  const handleExperience = () => {
    setExperience(true);
    setEducation(false);
  };

  const handleFamilirty = () => {
    setExperience(false);
    setEducation(false);
    setFamilirity(true);
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

  const addLocation = async () => {
    try {
      const id = localStorage.getItem("USERID")
      const data = await fetch(`https://backend-c40k.onrender.com/updateUser/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ about: { "Education": clickedButton, "Experiance": clickedExperience, "Familirty": clickedFamilirity } }),
        }
      );

      if (data.ok) {
        alert("added successfully");
        navigate("/welcome")
      } else {
        alert("Try Again and reload the page");
      }

    } catch (error) {
      alert("Try Again and reload the page");
    }
  };

  const buttonStyles = (button) => ({
    backgroundColor: clickedButton === button ? '#9C50FF' : 'white',
    color: clickedButton === button ? 'white' : 'black',
    width: "181px",
    height: "60px",
    transition: 'background-color 0.3s, color 0.3s',
  });

  const buttonStylesExperience = (button) => ({
    backgroundColor: clickedExperience === button ? '#9C50FF' : 'white',
    color: clickedExperience === button ? 'white' : 'black',
    width: "181px",
    height: "60px",
    transition: 'background-color 0.3s, color 0.3s',
  });

  const buttonStylesFamilirty = (button) => ({
    backgroundColor: clickedFamilirity === button ? '#9C50FF' : 'white',
    color: clickedFamilirity === button ? 'white' : 'black',
    width: "181px",
    height: "60px",
    transition: 'background-color 0.3s, color 0.3s',
  });

  return (
    <div style={{ height: "54rem", overflowX: "hidden" }} className='d-flex justify-content-center'>
      {/* education */}
      {
        education &&
        <div className='d-flex flex-column justify-content-between p-3' style={{ width: "100%", marginTop: "100px", zIndex: '5' }}>
          <div className='d-flex flex-column align-items-center justify-content-center'>
            <div className='text-center'>
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
                  width: "100%",
                  height: "48px"
                }}
              >
                ABOUT YOU!!
              </p>
            </div>
            <div
              className='d-flex align-items-center gap-3 border justify-content-evenly flex-column p-3'
              style={{
                background: "rgba(45, 52, 71, 1)",
                width: "100%",
                maxWidth: "660px",
                color: "white",
                borderRadius: "15px",
                border: "1px solid rgba(201, 201, 201, 1)",
                opacity: "1",
                marginTop: "12px",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                position: "relative",
                overflow: "hidden",
              }}>
              <div className="about-container-gradient"></div>
              <div className='d-flex  w-100 align-items-center justify-content-between '>
                <div></div>
                <div className='d-flex flex-column align-items-center justify-content-center' style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "0.4rem", width: "208px", height: "28px", marginTop: "4rem", color: "rgba(255, 233, 77, 1)", fontWeight: 600, marginLeft: "3rem", fontSize: "24px", letterSpacing: "0.05em", textAlign: "left" }}>
                  <div className='d-flex align-items-center justify-content-center'>
                    <p id='coding-experience' style={{ marginBottom: "0px" }}>
                      Who are You ?
                    </p>
                    <img src={AboutIcon1} alt='Loading...' style={{ marginBottom: "0px" }} />
                  </div>
                  <img src={Vector} alt='Loading...' />
                </div>

                <p className='d-flex justify-content-start p-3  ' style={{ color: "rgba(247, 147, 26, 1)", position: 'relative', bottom: '30px', left: '15px', cursor: 'pointer' }}>skip &gt;&gt;</p>
              </div>
              <div className='text-center mb-3'>
                Help us understand your current stage in life:
              </div>

              <div className='w-100 d-flex flex-column justify-content-between'>
                <div className='d-flex justify-content-center align-items-center'>
                  <div className='d-flex justify-content-center align-items-center  flex-column'>
                    <div className='d-flex flex-wrap gap-3  align-items-center justify-content-center w-100'>
                      <Button
                        variant=""
                        style={buttonStyles('High School Student')}
                        className="border mb-3"
                        onClick={() => handleButtonClick('High School Student')}
                      >
                        High School Student
                      </Button>
                      <Button
                        variant=""
                        style={buttonStyles('College Student')}
                        className="border mb-3"
                        onClick={() => handleButtonClick('College Student')}
                      >
                        College Student
                      </Button>
                    </div>
                    <div className='d-flex flex-wrap gap-3 align-items-center justify-content-center w-100'>
                      <Button
                        variant=""
                        style={buttonStyles('Professional')}
                        className="border mb-3"
                        onClick={() => handleButtonClick('Professional')}
                      >
                        Professional
                      </Button>
                      <Button
                        variant=""
                        style={buttonStyles('UnEmployed')}
                        className="border mb-3"
                        onClick={() => handleButtonClick('UnEmployed')}
                      >
                        UnEmployed
                      </Button>
                    </div>
                  </div>
                </div>

                <div className='d-flex justify-content-end w-100'>
                  <img src={RightArrowIconBlue} alt='Arrow-Icon' style={{ cursor: "pointer" }} onClick={handleExperience} />
                </div>
              </div>
            </div>
          </div>
          <div className='' style={{ width: "40vw", marginTop: "3rem", marginLeft: "-50vw", overflow: "hidden", position: "relative", left: "50%" }}>
            <p style={{ height: "22px", backgroundColor: "black" }}></p>
          </div>
        </div>
      }

      {/* experience */}
      {
        experience &&
        <div className='d-flex flex-column justify-content-between p-3' style={{ height: "auto", width: "100%", marginTop: "100px", zIndex: '5' }}>
          <div className='d-flex flex-column align-items-center justify-content-center'>
            <div className='text-center'>
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
                  width: "100%",
                  height: "48px"
                }}
              >
                ABOUT YOU!!
              </p>
            </div>
            <div
              className='d-flex align-items-center border justify-content-around flex-column p-3'
              style={{
                background: "rgba(45, 52, 71, 1)",
                width: "100%",
                maxWidth: "660px",
                color: "white",
                borderRadius: "15px",
                border: "1px solid rgba(201, 201, 201, 1)",
                opacity: "1",
                marginTop: "12px",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                position: "relative",
                overflow: "hidden",
              }}>
              <div className="about-container-gradient"></div>
              <div className='d-flex  w-100 align-items-center justify-content-between '>
                <div></div>
                <div className='d-flex flex-column align-items-center justify-content-center' style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "1rem", width: "400px", height: "28px", marginTop: "4rem", color: "rgba(255, 233, 77, 1)", fontWeight: 600, marginLeft: "3rem", fontSize: "24px", letterSpacing: "0.05em", textAlign: "left" }}>
                  <div className='d-flex align-items-center justify-content-center'>
                    <p id='coding-experience' style={{ marginBottom: "0px" }}>
                      Your Experience in Coding
                    </p>
                    <img src={AboutIcon2} alt='Loading...' style={{ marginBottom: "0px" }} />
                  </div>
                  <img src={Vector} alt='Loading...' style={{ marginBottom: "32px" }} />
                </div>

                <p className='d-flex justify-content-start p-3  ' style={{ color: "rgba(247, 147, 26, 1)", position: 'relative', bottom: '30px', left: '15px', cursor: 'pointer' }}>skip &gt;&gt;</p>
              </div>
              <div className='text-center mb-3'>
                Everyone starts somewhere, and we're here to support your journey. <br /> Let us know where you stand
              </div>

              <div className='w-100 d-flex flex-column justify-content-between'>
                <div className='d-flex justify-content-center align-items-center'>
                  <div className='d-flex justify-content-center align-items-center flex-column'>
                    <div className='d-flex flex-wrap gap-3 align-items-center justify-content-center w-100'>
                      <Button
                        variant=""
                        style={buttonStylesExperience('0-2 years')}
                        className="border mb-3"
                        onClick={() => handleButtonClickExperience('0-2 years')}
                      >
                        0 Yrs - Whats coding
                      </Button>
                      <Button
                        variant=""
                        style={buttonStylesExperience('3-5 years')}
                        className="border mb-3"
                        onClick={() => handleButtonClickExperience('3-5 years')}
                      >
                        &lt;1 Year - Newbie
                      </Button>
                    </div>
                    <div className='d-flex flex-wrap gap-3 align-items-center justify-content-center w-100'>
                      <Button
                        variant=""
                        style={buttonStylesExperience('5-7 years')}
                        className="border mb-3"
                        onClick={() => handleButtonClickExperience('5-7 years')}
                      >
                        2-4 Yrs - Intermediate
                      </Button>
                      <Button
                        variant=""
                        style={buttonStylesExperience('7+ years')}
                        className="border mb-3"
                        onClick={() => handleButtonClickExperience('7+ years')}
                      >
                        +4 Years - Expert
                      </Button>
                    </div>
                  </div>
                </div>

                <div className='d-flex justify-content-end w-100'>
                  <img src={RightArrowIconBlue} alt='Arrow-Icon' style={{ cursor: "pointer" }} onClick={handleFamilirty} />
                </div>
              </div>
            </div>
          </div>
          <div className='' style={{ width: "70vw", marginTop: "3rem", marginLeft: "-50vw", overflow: "hidden", position: "relative", left: "50%" }}>
            <p style={{ height: "22px", backgroundColor: "black" }}></p>
          </div>
        </div>
      }

      {/* familirity */}
      {
        familirity &&
        <div className='d-flex flex-column justify-content-between p-3' style={{ height: "auto", width: "100%", marginTop: "100px", zIndex: '5' }}>
          <div className='d-flex flex-column align-items-center justify-content-center'>
            <div className='text-center'>
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
                  width: "100%",
                  height: "48px",
                }}
              >
                ABOUT YOU!!
              </p>
            </div>
            <div
              className='d-flex align-items-center border justify-content-around flex-column p-3'
              style={{
                background: "rgba(45, 52, 71, 1)",
                width: "100%",
                maxWidth: "660px",
                color: "white",
                borderRadius: "15px",
                border: "1px solid rgba(201, 201, 201, 1)",
                opacity: "1",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                marginTop: "12px",
                position: "relative",
                overflow: "hidden",
              }}>
              <div className="about-container-gradient"></div>
              <div className='d-flex  w-100 align-items-center justify-content-between '>
                <div></div>
                <div className='d-flex flex-column align-items-center justify-content-center' style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "1rem", width: "400px", height: "28px", marginTop: "4rem", color: "rgba(255, 233, 77, 1)", fontWeight: 600, marginLeft: "3rem", fontSize: "24px", letterSpacing: "0.05em", textAlign: "left" }}>
                  <div className='d-flex align-items-center justify-content-center'>
                    <p id='coding-experience' style={{ marginBottom: "0px" }}>
                      Familiarity with Web3?
                    </p>
                    <img src={AboutIcon3} alt='Loading...' style={{ marginBottom: "0px" }} />
                  </div>
                  <img src={Vector} alt='Loading...' style={{ marginBottom: "32px" }} />
                </div>

                <p className='d-flex justify-content-start p-3  ' style={{ color: "rgba(247, 147, 26, 1)", position: 'relative', bottom: '30px', left: '15px', cursor: 'pointer' }}>skip &gt;&gt;</p>
              </div>
              <div className='text-center mb-3'>
                Web3 can be a new concept for many.  <br />
                Let us know how familiar you are with it
              </div>

              <div className='w-100 d-flex flex-column justify-content-between'>
                <div className='d-flex justify-content-center align-items-center'>
                  <div className='d-flex justify-content-center align-items-center flex-column'>
                    <div className='d-flex flex-wrap gap-3 align-items-center justify-content-center w-100'>
                      <Button
                        variant=""
                        style={buttonStylesFamilirty('Very Familiar')}
                        className="border mb-3"
                        onClick={() => handleButtonClickFamilirity('Very Familiar')}
                      >
                        Yes, of course
                      </Button>
                      <Button
                        variant=""
                        style={buttonStylesFamilirty('Familiar')}
                        className="border mb-3"
                        onClick={() => handleButtonClickFamilirity('Familiar')}
                      >
                        Heard of It
                      </Button>
                    </div>
                    <div className='d-flex flex-wrap gap-3 align-items-center justify-content-center w-100'>
                      <Button
                        variant=""
                        style={buttonStylesFamilirty('Somewhat Familiar')}
                        className="border mb-3"
                        onClick={() => handleButtonClickFamilirity('Somewhat Familiar')}
                      >
                        Never Heard
                      </Button>
                      <Button
                        variant=""
                        style={buttonStylesFamilirty('Not Familiar')}
                        className="border mb-3"
                        onClick={() => handleButtonClickFamilirity('Not Familiar')}
                      >
                        Only know Crypto
                      </Button>
                    </div>
                  </div>
                </div>

                <div className='d-flex justify-content-end w-100'>
                  <img src={RightArrowIconBlue} alt='Arrow-Icon' style={{ cursor: "pointer" }} onClick={addLocation} />
                </div>
              </div>
            </div>
          </div>
          <div className='' style={{ width: "99.4vw", marginTop: "3rem", marginLeft: "-50vw", overflow: "hidden", position: "relative", left: "50%" }}>
            <p style={{ height: "22px", backgroundColor: "black" }}></p>
          </div>
        </div>
      }
    </div>
  );
};

export default AboutComponent;