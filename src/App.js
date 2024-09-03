import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './components/SplashScreen/SplashScreen';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import SubscriptionPage from './components/pages/SubscriptionPage';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import VisitPage from './components/pages/VisitPage';
import UserVisitsPage from './components/pages/UserVisitsPage';
import Navbar from './components/Navbar/Navbar';
import { AuthProvider } from './components/context/AuthContext';
import { SubscriptionProvider } from './components/context/SubscriptionContext';
import ChatPage from "./components/pages/ChatPage";
import ProfilePage from "./components/pages/ProfilePage";
import {ProfileProvider} from "./components/context/ProfileContext";

function App() {
    const [showSplash, setShowSplash] = useState(true);

    const handleSplashComplete = () => {
        setShowSplash(false);
    };

    return (
        <AuthProvider>
            <SubscriptionProvider>
                <Router>
                    <div className="App">
                        {showSplash ? (
                            <SplashScreen onComplete={handleSplashComplete} />
                        ) : (
                            <>

                                <Navbar />
                                <Routes>
                                    <Route path="/" element={<Home/>}/>
                                    <Route path="/about" element={<About/>}/>
                                    <Route path="/contact" element={<Contact/>}/>
                                    <Route path="/login" element={<Login/>}/>
                                    <Route path="/subscriptions" element={<SubscriptionPage/>}/>
                                    <Route path="/visits" element={<VisitPage/>}/>
                                    <Route path="/user-visits" element={<UserVisitsPage/>}/>

                                    <Route path="/profile" element={<ProfileProvider>
                                        <ProfilePage/>
                                    </ProfileProvider>}/>

                                </Routes>

                            </>
                            )}
                    </div>
                    <div>
                        <Routes>
                            <Route path="/chat" element={<ChatPage/>}/>
                        </Routes>
                    </div>
                </Router>
            </SubscriptionProvider>
        </AuthProvider>
    );
}

export default App;
