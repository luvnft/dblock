import React, { useEffect, useState } from 'react';
import axios from "axios";
import { basicSetup } from 'codemirror';
import CodeMirror from '@uiw/react-codemirror';
import { solidity } from '@replit/codemirror-lang-solidity';
import { oneDark } from '@codemirror/theme-one-dark';
import CompilerNavbar from '../../components/CompilerNavbar';
import ProblemSolvedModal from '../../components/ProblemSolvedModal';
import HintsIntroModal from '../../components/HintsIntroModal';
import HintsModal from '../../components/HintsModal';
import CompilationSuccessModal from '../../components/CompilationSuccessModal';
import CompilationFailedModal from '../../components/CompilationFailedModal';
import { SolidityIcon, HintsIcon, ChevronUpIcon, FileIcon, ListIcon, CompilerLeftArrowIcon, CompilerRightArrowIcon, ChevronDownIcon, ThumbsUpIcon, ThumbsDownIcon, FeedbackIcon, BulbIcon, ThumbsUpIconActive, ThumbsDownIconActive } from '../../assets/export';
import '../../assets/styles/compiler.css';
import Loader from '../../components/Loader';
import CompilerIntroModal from '../../components/CompilerIntroModal';

const Compiler = ({ isNewUser }) => {
    const [fetchedData, setFetchedData] = useState([]);
    const [url, setUrl] = useState("")
    const [selectedLanguage, setSelectedLanguage] = useState("solidity");
    const [boilerPlate, setBoilerPlate] = useState("");
    const [codeInput, setCodeInput] = useState(boilerPlate);
    const [output, setOutput] = useState("");
    const [testResults, setTestResults] = useState([]);
    const [problemSolvedSuccess, setProblemSolvedSuccess] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showSuccess, setShowSucess] = useState(false)
    const [showerror, setShowerror] = useState(false)
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [modelCode, setModelCode] = useState('');
    const [showHintsModalIntro, setShowHintsModalIntro] = useState(false);
    const [bytecode, setByteCode] = useState("")
    const [isProblemLiked, setIsProblemLiked] = useState(false);
    const [loading, setLoading] = useState(false)
    const [addId, setAddId] = useState('')
    const [hints, setHints] = useState([])
    const [compilerQuickStartStep, setCompilerQuickStartStep] = useState(-1);

    useEffect(() => {
        if (isNewUser) {
            setTimeout(() => {
                setShowHintsModalIntro(true);
                setCompilerQuickStartStep(0);
            }, 2000);
        }

        const fetchData = async () => {
            try {
                const response = await axios.get("https://backend-c40k.onrender.com/AllProblem");
                const data = response.data;
                setHints(data[0].Hints)
                setAddId(data[0]._id)
                setFetchedData(data[0]);
                if (data.length > 0) {
                    setBoilerPlate(data[0].BoilerPlate); // Assuming the first problem's boilerplate
                    setCodeInput(data[0].BoilerPlate);
                    setByteCode(data[0].ByteCode)
                    setUrl('/alert')
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleCompile = async () => {
        if (selectedLanguage === "solidity") {
            try {
                setLoading(true);
                const response = await fetch("https://backend-c40k.onrender.com/compile", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ solCode: codeInput }),
                });
                setLoading(false);

                if (!response.ok) {
                    const errorResponse = await response.json();
                    setShowerror(true)
                    throw new Error(errorResponse.errors.join("\n"));
                }

                setShowSucess(true)
                const result = await response.json();
                setOutput(result.message);
            } catch (error) {
                setLoading(false);
                setOutput(`Error: ${error.message}`);
            }
        } else {
            setOutput("Compilation for this language is not supported yet.");
        }
    };

    const handleSubmit = async () => {
        if (selectedLanguage === "solidity") {
            setLoading(true);
            try {
                const response = await fetch("https://backend-c40k.onrender.com/submit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ solCode: codeInput }),
                });

                // if (!response.ok) {
                //     const errorResponse = await response.json();
                //     throw new Error(errorResponse.error);
                // }

                const result = await response.json();
                console.log(result);

                if (response.ok) {
                    const id = localStorage.getItem("USERID")

                    const userData = await axios.get(`https://backend-c40k.onrender.com/getUserId/${id}`)
                    const findID = userData.data.fetchedData._id;
                    const solvedId = userData.data.fetchedData.solved
                    if (solvedId.includes(addId)) {
                        alert("You already Solved It")
                    }
                    else {
                        setProblemSolvedSuccess(true);
                        await axios.patch(`https://backend-c40k.onrender.com/updateUserPoint/${id}`, {
                            points: 10,
                        })
                        await axios.patch(`https://backend-c40k.onrender.com/updateUser/${id}`, {
                            solved: [addId]
                        })
                    }
                }
                else {
                    setShowerror(true);
                };

            } catch (error) {
                setOutput(`Error: ${error.message}`);
            }
            finally {
                setLoading(false)
            }
        } else {
            setOutput("Submission for this language is not supported yet.");
        }
    };

    const handleSeeHint = () => {
        setModalTitle('Hint');
        setModalMessage(hints);
        setModelCode(fetchedData[0]?.BoilerPlate || 'No code available');
        setShowModal(true);
    };

    return (
        <div className="compiler-container-wrapper">
            {loading && <Loader />}
            {problemSolvedSuccess && <ProblemSolvedModal reward={10} url={url} setProblemSolvedSuccess={setProblemSolvedSuccess} />}
            {showSuccess && <CompilationSuccessModal setShowSucess={setShowSucess} />}
            {showerror && <CompilationFailedModal setShowerror={setShowerror} />}
            <HintsModal show={showModal} title={modalTitle} message={modalMessage} code={modelCode} onClose={() => setShowModal(false)} />

            {compilerQuickStartStep === 0 && <CompilerIntroModal introType="questSection" setCompilerQuickStartStep={setCompilerQuickStartStep} />}
            {compilerQuickStartStep === 1 && <CompilerIntroModal introType="compilerSection" setCompilerQuickStartStep={setCompilerQuickStartStep} />}
            {compilerQuickStartStep === 2 && <CompilerIntroModal introType="compileButton" setCompilerQuickStartStep={setCompilerQuickStartStep} />}
            {compilerQuickStartStep === 3 && <CompilerIntroModal introType="submitButton" setCompilerQuickStartStep={setCompilerQuickStartStep} />}

            <CompilerNavbar />
            <div className="compiler-container">
                {(showHintsModalIntro || compilerQuickStartStep >= 0) && <div className="compiler-container-overlay"></div>}

                <div className="left-compiler-container">
                    <div className="left-compiler-top">
                        <div className="left-compiler-top-left">
                            <img src={FileIcon} alt="File-Icon" className="left-compiler-top-left-icon" />
                            <p className="left-compiler-top-left-text">Description</p>
                        </div>

                        <div className="left-compiler-top-right">
                            <div className="left-compiler-top-right-start">
                                <img src={ListIcon} alt="List-Icon" className="left-compiler-top-right-start-icon" />
                                <p className="left-compiler-top-right-start-text">Problem List</p>
                            </div>

                            <div className="left-compiler-top-right-end">
                                <img src={CompilerLeftArrowIcon} alt="Left-Arrow-Icon" className="left-compiler-top-right-end-icon" />
                                <img src={CompilerRightArrowIcon} alt="Right-Arrow-Icon" className="left-compiler-top-right-end-icon" />
                            </div>
                        </div>
                    </div>

                    <div className="left-compiler-middle">
                        <div className="left-compiler-middle-top hideBorder">
                            <p className="left-compiler-middle-top-text">Theme: <span>{fetchedData?.Theme}</span></p>
                        </div>

                        <div className="left-compiler-middle-top">
                            <p className="left-compiler-middle-top-text bigText">{fetchedData?.SubTheme}</p>
                            <img src={ChevronDownIcon} alt="Chevron-Down-Icon" className="left-compiler-middle-top-icon" />
                        </div>

                        <div className="left-compiler-middle-bottom">
                            <p className="left-compiler-middle-bottom-complexity">Easy</p>

                            <div className="left-compiler-middle-bottom-statistics">
                                <div className="left-compiler-middle-bottom-statistics-box" onClick={() => setIsProblemLiked(!isProblemLiked)}>
                                    <img src={isProblemLiked ? ThumbsUpIconActive : ThumbsUpIcon} alt="Thumbs-Up-Icon" className="left-compiler-middle-bottom-statistics-icon" />
                                    <p className="left-compiler-middle-bottom-statistics-text">0</p>
                                </div>

                                <div className="left-compiler-middle-bottom-statistics-box" onClick={() => setIsProblemLiked(!isProblemLiked)}>
                                    <img src={isProblemLiked ? ThumbsDownIcon : ThumbsDownIconActive} alt="Thumbs-Down-Icon" className="left-compiler-middle-bottom-statistics-icon" />
                                    <p className="left-compiler-middle-bottom-statistics-text">0</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="left-compiler-bottom">
                        <div className="left-compiler-bottom-middle">
                            <div className="left-compiler-bottom-middle-box">
                                <h2 className="left-compiler-bottom-middle-box-title">Problem Statement:</h2>
                                <h4 className="left-compiler-bottom-middle-box-heading">
                                    {fetchedData?.ProblemStatement?.map((item, index) => (
                                        item.type === 'normal' ? <span key={index}>{item.message}</span> : <span style={{ color: '#F7931A', backgroundColor: "#8f8f8f2e", marginRight: "5px", padding: "0px 5px 4px 5px", lineHeight: "30px", borderRadius: "5px", fontWeight: '400' }} key={index}>{item.message}</span>
                                    ))}
                                </h4>
                                <h4 className="left-compiler-bottom-middle-box-description">{fetchedData?.ProblemDescription}</h4>
                            </div>

                            <div className="left-compiler-bottom-middle-box">
                                <h4 className="left-compiler-bottom-middle-box-heading">Instructions:</h4>
                                {fetchedData?.Instructions?.map((item, index) => (
                                    <div className="left-compiler-bottom-middle-box-description" key={index}>{index + 1}. {item.title?.map((subItem, subIndex) => (
                                        subItem.type === 'normal' ? <span key={subIndex}>{subItem.message}</span> : <span style={{ color: '#F7931A', backgroundColor: "#8f8f8f2e", marginRight: "5px", padding: "0px 5px 4px 5px", lineHeight: "30px", borderRadius: "5px", fontWeight: '400' }} key={subIndex}>{subItem.message}</span>
                                    ))}

                                        {item.description && item.description?.map((subSubItem, subSubIndex) => (
                                            <p className="left-compiler-bottom-middle-box-description nestedListing" key={subSubIndex}>
                                                {subSubItem?.map((nestedItem, nestedIndex) => (
                                                    nestedItem.type === 'normal' ? <span key={nestedIndex}>{nestedItem.message}</span> : <span style={{ color: '#F7931A', backgroundColor: "#8f8f8f2e", marginRight: "5px", padding: "0px 5px 4px 5px", lineHeight: "30px", borderRadius: "5px", fontWeight: '400' }} key={nestedIndex}>{nestedItem.message}</span>
                                                ))}
                                            </p>
                                        ))}
                                    </div>
                                ))}
                            </div>

                            <div className="left-compiler-bottom-middle-box">
                                <h4 className="left-compiler-bottom-middle-box-heading">Constraints:</h4>
                                {fetchedData?.Constraints?.map((item, index) => (
                                    <p className="left-compiler-bottom-middle-box-description listing" key={index}>
                                        {item?.map((subItem, subIndex) => (
                                            subItem.type === 'normal' ? <span key={subIndex}>{subItem.message}</span> : <span style={{ color: '#F7931A', backgroundColor: "#8f8f8f2e", marginRight: "5px", padding: "0px 5px 4px 5px", lineHeight: "30px", borderRadius: "5px", fontWeight: '400' }} key={subIndex}>{subItem.message}</span>
                                        ))}
                                    </p>
                                ))}
                            </div>

                            {fetchedData?.Output && <div className="left-compiler-bottom-middle-box">
                                <h4 className="left-compiler-bottom-middle-box-heading">Output:</h4>
                                <p className="left-compiler-bottom-middle-box-description">{fetchedData?.Output}</p>
                            </div>}
                        </div>

                        <div className="left-compiler-bottom-bottom">
                            <div className="left-compiler-bottom-bottom-top">
                                <img src={FeedbackIcon} alt="Feedback-Icon" className="left-compiler-bottom-bottom-top-icon" />
                                <p className="left-compiler-bottom-bottom-top-text">Feedback</p>
                            </div>

                            <div className="left-compiler-bottom-bottom-bottom">Copyright ©️ 2024 DcodeBlock All rights reserved</div>
                        </div>
                    </div>
                </div>

                <div className="right-compiler-container">
                    <div className="right-compiler-top">
                        <div className="right-compiler-top-left">
                            <img src={SolidityIcon} alt="Solidity-Icon" className="right-compiler-top-left-icon" />
                            <p className="right-compiler-top-left-text">Solidity</p>
                        </div>

                        <div className="right-compiler-top-right" onClick={handleSeeHint}>
                            <img src={BulbIcon} alt="Bulb-Icon" className={showHintsModalIntro ? "right-compiler-top-right-bulb-icon hidden" : "right-compiler-top-right-bulb-icon"} />
                            <div className="right-compiler-top-right-btn">
                                <img src={HintsIcon} alt="Hint-Icon" className="right-compiler-top-right-icon" />
                                <p className="right-compiler-top-right-text">Hints</p>
                            </div>
                        </div>

                        {showHintsModalIntro && <HintsIntroModal setShowHintsModalIntro={setShowHintsModalIntro} />}
                    </div>

                    <div className="right-compiler-middle-wrapper">
                        {compilerQuickStartStep === 4 && <CompilerIntroModal introType="contractOutput" setCompilerQuickStartStep={setCompilerQuickStartStep} />}
                        {compilerQuickStartStep === 5 && <CompilerIntroModal introType="returnOutput" setCompilerQuickStartStep={setCompilerQuickStartStep} />}

                        <div className="right-compiler-middle">
                            <CodeMirror extensions={[basicSetup, solidity]} theme={oneDark} height="90%" width='100%' style={{ overflow: "hidden" }}
                                onChange={(newCode) => setCodeInput(newCode)}
                                value={codeInput}
                            />
                        </div>
                    </div>

                    <div className="right-compiler-bottom">
                        <div className="right-compiler-bottom-left">
                            <p className="right-compiler-bottom-left-text">Console</p>
                            <img src={ChevronUpIcon} alt="Chevron-Up-Icon" className="right-compiler-bottom-left-icon" />
                        </div>

                        <div className="right-compiler-bottom-right">
                            <div className="compile-btn" onClick={handleCompile}>Compile</div>
                            <div className={`submit-btn ${loading ? 'disabled' : ''}`} onClick={handleSubmit} disabled={loading}>
                                Submit
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Compiler;
