import React, { useEffect, useState } from 'react';
import { SplashContainer, Logo, Text, SubText } from '../../styles/SplashScreen.styles';
import logo from '../../assets/medogram-logo.png';

const SplashScreen = ({ onComplete }) => {
    const [text, setText] = useState('');
    const fullText = 'Medogram';

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setText((prev) => prev + fullText[index]);
            index += 1;
            if (index === fullText.length) {
                clearInterval(interval);
                setTimeout(onComplete, 3000);
            }
        }, 150);
        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <SplashContainer>
            <Logo
                src={logo}
                alt="Medogram Logo"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5 }}
            />
            <Text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1.5 }}
            >
                {text}
            </Text>
            <SubText
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0, duration: 2 }}
            >
                Smart Clinic
            </SubText>
        </SplashContainer>
    );
};

export default SplashScreen;
