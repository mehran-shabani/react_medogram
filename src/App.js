import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './components/SplashScreen/SplashScreen';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import SubscriptionPage from './components/pages/SubscriptionPage';
import VisitPage from './components/pages/VisitPage';
import UserVisitsPage from './components/pages/UserVisitsPage';
import { AuthProvider } from './components/context/AuthContext';
import { SubscriptionProvider } from './components/context/SubscriptionContext';

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
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/subscriptions" element={<SubscriptionPage />} />
                                <Route path="/visits" element={<VisitPage />} />
                                <Route path="/user-visits" element={<UserVisitsPage />} />
                            </Routes>
                        )}
                    </div>
                </Router>
            </SubscriptionProvider>
        </AuthProvider>
    );
}

export default App;
