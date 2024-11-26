import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const gradientAnimation = keyframes`
    0% {
        background-position: 0 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0 50%;
    }
`;

const SplashContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(-45deg, #f0f4f8, #d9e2ec, #bcccdc, #9fb3c8);
    background-size: 400% 400%;
    animation: ${gradientAnimation} 15s ease infinite;
    text-align: center;
    overflow: hidden;
`;

const LogoContainer = styled(motion.div)`
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
`;

const LogoIcon = styled(motion.div)`
    width: 60px;
    height: 60px;
    background-color: #334e68;
    border-radius: 15px;
    margin-right: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
`;

const LogoText = styled(motion.div)`
    font-size: 3rem;
    font-weight: 700;
    color: #334e68;
    letter-spacing: 2px;
    font-family: 'Arial', sans-serif;
`;

const pulseAnimation = keyframes`
    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(51, 78, 104, 0.7); }
    70% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(51, 78, 104, 0); }
    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(51, 78, 104, 0); }
`;

const Pulse = styled(motion.div)`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: rgba(51, 78, 104, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${pulseAnimation} 2s infinite;
`;

const HeartIcon = styled(motion.div)`
    font-size: 3.5rem;
    color: #334e68;
`;

const Text = styled(motion.div)`
    font-size: 1.4rem;
    color: #334e68;
    font-weight: 500;
    margin: 2rem 0;
    font-family: 'Arial', sans-serif;
`;

const ProgressBarContainer = styled(motion.div)`
    width: 250px;
    height: 10px;
    background-color: rgba(51, 78, 104, 0.2);
    border-radius: 5px;
    overflow: hidden;
    position: relative;
`;

const ProgressFill = styled(motion.div)`
    height: 100%;
    background-color: #334e68;
    border-radius: 5px;
`;

const ProgressText = styled(motion.div)`
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    color: #334e68;
    font-size: 0.9rem;
    font-weight: 600;
`;

const FeatureList = styled(motion.div)`
    display: flex;
    justify-content: center;
    margin-top: 2rem;
`;

const FeatureItem = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 1rem;
    color: #334e68;
`;

const FeatureIcon = styled.div`
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
`;

const SplashScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const duration = Math.floor(Math.random() * (7000 - 5000 + 1)) + 5000;
        const interval = 30;
        let currentProgress = 0;

        const timer = setInterval(() => {
            currentProgress += (interval / duration) * 100;
            setProgress(Math.min(currentProgress, 100));

            if (currentProgress >= 100) {
                clearInterval(timer);
                setTimeout(onComplete, 1000);
            }
        }, interval);

        return () => clearInterval(timer);
    }, [onComplete]);

    const features = [
        { icon: '📊', text: 'Analytics' },
        { icon: '🔔', text: 'Reminders' },
        { icon: '🔒', text: 'Security' },
    ];

    return (
        <AnimatePresence>
            <SplashContainer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <LogoContainer>
                    <LogoIcon
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        💊
                    </LogoIcon>
                    <LogoText
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        MEDOGRAM
                    </LogoText>
                </LogoContainer>

                <Pulse>
                    <HeartIcon
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.6 }}
                    >
                        ❤️
                    </HeartIcon>
                </Pulse>

                <Text
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    Checking Your System Health...
                </Text>

                <ProgressBarContainer
                    initial={{ width: 0 }}
                    animate={{ width: 250 }}
                    transition={{ duration: 0.5, delay: 1 }}
                >
                    <ProgressFill
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                    />
                    <ProgressText>{Math.round(progress)}%</ProgressText>
                </ProgressBarContainer>

                <FeatureList>
                    {features.map((feature, index) => (
                        <FeatureItem
                            key={index}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                        >
                            <FeatureIcon>{feature.icon}</FeatureIcon>
                            <div>{feature.text}</div>
                        </FeatureItem>
                    ))}
                </FeatureList>
            </SplashContainer>
        </AnimatePresence>
    );
};

export default SplashScreen;