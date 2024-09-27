import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './components/SplashScreen/SplashScreen';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import VisitPage from './components/pages/VisitPage';
import UserVisitsPage from './components/pages/UserVisitsPage';
import ExcludedServices from './components/pages/ExcludedServices'
import Navbar from './components/Navbar/Navbar';
import { AuthProvider } from './components/context/AuthContext';
import ChatPage from "./components/pages/ChatPage";
import TransactionComponent from './components/pages/TransactionComponent';
import PaymentRedirect from "./components/pages/PaymentRedirect";
import ProfilePage from "./components/pages/ProfilePage";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from "./components/pages/Footer";
import BlogPostPage from "./components/pages/BlogPostPage";
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
function App() {
    const [showSplash, setShowSplash] = useState(true);

    const handleSplashComplete = () => {
        setShowSplash(false);
    };

    return (
        <AuthProvider>


                <Router>
                    <div className="App">

                        {showSplash ? (
                            <SplashScreen onComplete={handleSplashComplete} />
                        ) : (
                            <>
                            <ThemeProvider theme={theme}>
                                <Navbar/>
                                <Routes>
                                    <Route path="/" element={<Home/>}/>
                                    <Route path="/about" element={<About/>}/>
                                    <Route path="/contact" element={<Contact/>}/>
                                    <Route path="/login" element={<Login/>}/>
                                    <Route path="/visits" element={<VisitPage/>}/>
                                    <Route path="/user-visits" element={<UserVisitsPage/>}/>
                                    <Route path="/profile" element={<ProfilePage/>}/>
                                    <Route path="/payment-visit" element={<TransactionComponent />} />
                                    <Route path="/excluded-services" element={<ExcludedServices />} />
                                    <Route path="/payment-redirect" element={<PaymentRedirect />} />
                                    <Route path="/blogs" element={<BlogPostPage />} />
                                    <Route path="/chat" element={<ChatPage/>}/>
                                </Routes>
                                <Footer />
                            </ThemeProvider>
                            </>
                        )}
                    </div>

                </Router>

        </AuthProvider>
    );
}

export default App;
