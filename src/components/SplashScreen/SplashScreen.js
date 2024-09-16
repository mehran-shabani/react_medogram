import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
`;

const SplashContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(135deg, #f6f9fc 0%, #e9f2f9 100%);
    text-align: center;
`;

const Logo = styled.div`
    font-size: 2.5rem;
    font-weight: 700;
    color: #0056b3;
    margin-bottom: 2rem;
    animation: ${fadeIn} 1s ease-out;
    letter-spacing: 1px;
    font-family: 'Arial', sans-serif;
`;

const spinAnimation = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
    width: 50px;
    height: 50px;
    border: 3px solid rgba(0, 86, 179, 0.1);
    border-left-color: #0056b3;
    border-radius: 50%;
    animation: ${spinAnimation} 1s linear infinite;
    margin-bottom: 1.5rem;
`;

const Text = styled.div`
    font-size: 1rem;
    color: #333;
    font-weight: 500;
    margin-bottom: 1rem;
    animation: ${fadeIn} 1s ease-out;
    font-family: 'Arial', sans-serif;
`;

const ProgressBar = styled.div`
    width: 180px;
    height: 4px;
    background-color: #e0e0e0;
    border-radius: 2px;
    overflow: hidden;
`;

const ProgressFill = styled.div`
    width: ${props => props.width}%;
    height: 100%;
    background-color: #0056b3;
    transition: width 0.3s ease-out;
`;

const SplashScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const duration = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000;
        const interval = 30; // Update progress every 30ms
        let currentProgress = 0;

        const timer = setInterval(() => {
            currentProgress += (interval / duration) * 100;
            setProgress(Math.min(currentProgress, 100));

            if (currentProgress >= 100) {
                clearInterval(timer);
                onComplete();
            }
        }, interval);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <SplashContainer>
            <Logo>MEDOGRAM</Logo>
            <Spinner />
            <Text>Checking Health System</Text>
            <ProgressBar>
                <ProgressFill width={progress} />
            </ProgressBar>
        </SplashContainer>
    );
};

export default SplashScreen;