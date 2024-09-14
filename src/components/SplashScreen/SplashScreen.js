import React, { useEffect } from 'react';
import styled from 'styled-components';

const SplashContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: white;
    text-align: center;
`;

const Spinner = styled.div`
    border: 8px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top: 8px solid #007bff;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin-bottom: 20px;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

const Text = styled.div`
    font-size: 1.5rem;
    color: #333;
    font-weight: ;
`;

const SplashScreen = ({ onComplete }) => {
    useEffect(() => {
        const duration = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000;
        const timer = setTimeout(onComplete, duration);

        return () => clearTimeout(timer); // Clean up the timer on component unmount
    }, [onComplete]);

    return (
        <SplashContainer>
            <Spinner />
            <Text>Checking Health System</Text>
        </SplashContainer>
    );
};

export default SplashScreen;
