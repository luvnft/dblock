import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthRouter } from './lib/AuthRouter';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Store from './pages/Store';
import Welcome from './pages/Welcome';
import About from './pages/About';
import Alert from './pages/Alert';
import Compiler from './lib/compiler/Compiler';
import Compile1 from './lib/compiler/Compile1';
import Compile2 from './lib/compiler/Compile2';
import Error from './pages/Error';
import AI from './pages/AI';

const App = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [currentUser, setCurrentUser] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [isFeedbackRendered, setIsFeedbackRendered] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [rewardModalOpen, setRewardModalOpen] = useState(false);
  const [claimFirstRewardModalOpen, setClaimFirstRewardModalOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 2000);

    const currentUserData = localStorage.getItem('USERID');
    if (currentUserData) {
      setCurrentUser(true);
    }

    const isNewUserData = localStorage.getItem('IsNewUser');
    if (!isNewUserData && currentUserData) {
      localStorage.setItem('IsNewUser', "No");
      setIsNewUser(true);
    }
  }, []);

  return (
    <Router>
      {showLoader ? <div className="preloader-container"></div> : <Routes>
        <Route exact path='/' element={currentUser ? <Dashboard showFeedbackModal={showFeedbackModal} setShowFeedbackModal={setShowFeedbackModal} isFeedbackRendered={isFeedbackRendered} setIsFeedbackRendered={setIsFeedbackRendered} currentUser={currentUser} isNewUser={isNewUser} rewardModalOpen={rewardModalOpen} setRewardModalOpen={setRewardModalOpen} /> : <Home currentUser={currentUser} />} />
        
        <Route exact path='/sign-up' element={<SignUp currentUser={currentUser} setCurrentUser={setCurrentUser} setIsNewUser={setIsNewUser} />} />
        <Route exact path='/login' element={<Login currentUser={currentUser} />} />
        <Route exact path='/AI' element={<AI currentUser={currentUser} />} />
        <Route exact path='/compiler' element={<Compiler isNewUser={isNewUser} />} />
        <Route exact path='/compiler1' element={<Compile1 isNewUser={isNewUser} />} />
        <Route exact path='/compiler2' element={<Compile2 isNewUser={isNewUser} />} />
        <Route exact path='/store' element={<Store showFeedbackModal={showFeedbackModal} setShowFeedbackModal={setShowFeedbackModal} isFeedbackRendered={isFeedbackRendered} setIsFeedbackRendered={setIsFeedbackRendered} isNewUser={isNewUser} currentUser={currentUser} claimFirstRewardModalOpen={claimFirstRewardModalOpen} setClaimFirstRewardModalOpen={setClaimFirstRewardModalOpen} />} />

        <Route element={<AuthRouter currentUser={currentUser} />}>
          <Route path="/about" element={<About currentUser={currentUser} />} />
          <Route path="/welcome" element={<Welcome currentUser={currentUser} />} />
          <Route path="/alert" element={<Alert currentUser={currentUser} />} />
        </Route>

          <Route path="/*" element={<Error />} />
      </Routes>}
    </Router>
  )
}

export default App;