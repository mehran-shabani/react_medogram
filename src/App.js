import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import SplashScreen from './components/SplashScreen/SplashScreen';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import About from './components/Details/About';
import Contact from './components/Details/Contact';
import VisitPage from './components/Visit/VisitPage';
import UserVisitsPage from './components/Visit/UserVisitsPage';
import ExcludedServices from './components/Details/ExcludedServices'
import Navbar from './components/Navbar/Navbar';
import { AuthProvider } from './components/Auth/AuthContext';
import ChatPage from "./components/chat/ChatPage";
import TransactionComponent from './components/Payment/TransactionComponent';
import PaymentRedirect from "./components/Payment/PaymentRedirect";
import ProfilePage from "./components/Auth/ProfilePage";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from "./components/Home/Footer";
import BlogPostPage from "./components/Blog/BlogPostPage";
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import logoImage from '../src/images/medogram-logo.png';
import DiabetesPredict from "./components/predictions/DiabetPredict";
import NotFound from './components/NotFound';

function App() {
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
        if (hasSeenSplash) {
            setShowSplash(false);
        }
    }, []);

    const handleSplashComplete = () => {
        setShowSplash(false);
        sessionStorage.setItem('hasSeenSplash', 'true');
    };

    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Helmet>
                        <title>Medogram</title>
                        <link rel="icon" type="image/png" href={logoImage} />
                        <meta name="description" content="Medogram - Your Medical Assistant" />
                    </Helmet>

                    {showSplash ? (
                        <SplashScreen onComplete={handleSplashComplete} />
                    ) : (
                        <>
                            <ThemeProvider theme={theme}>
                                <Navbar logo={logoImage} />
                                <Routes>
                                    <Route path="/" element={<Home/>}/>
                                    <Route path="/about" element={<About/>}/>
                                    <Route path="/contact" element={<Contact/>}/>
                                    <Route path="/login" element={<Login/>}/>
                                    <Route path="/visits" element={<VisitPage/>}/>
                                    <Route path="/user-visits" element={<UserVisitsPage/>}/>
                                    <Route path="/profile" element={<ProfilePage/>}/>
                                    <Route path="/diabetes-prediction" element={<DiabetesPredict/>}/>
                                    <Route path="/payment-visit" element={<TransactionComponent />} />
                                    <Route path="/excluded-services" element={<ExcludedServices />} />
                                    <Route path="/payment-redirect" element={<PaymentRedirect />} />
                                    <Route path="/blogs" element={<BlogPostPage />} />
                                    <Route path="/chat" element={<ChatPage/>}/>
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                                <Footer logo={logoImage} />
                            </ThemeProvider>
                        </>
                    )}
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;