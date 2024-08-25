import React, { useEffect, useState } from 'react';
import { SplashContainer, Logo, Text, SubText } from '../../styles/SplashScreen.styles';
import { motion } from 'framer-motion';
import logo from '../../assets/medogram-logo.png';

const SplashScreen = ({ onComplete }) => {
    const [text, setText] = useState('');
    const fullText = 'Medogram';

    useEffect(() => {
        let index = 0;
        let timeoutId;

        const typeText = () => {
            if (index < fullText.length) {
                setText((prev) => prev + fullText.charAt(index));
                index += 1;
                timeoutId = setTimeout(typeText, 200); // فاصله بین تایپ هر کاراکتر
            } else {
                setTimeout(onComplete, 5000); // زمان تاخیر بعد از اتمام تایپ
            }
        };

        typeText(); // شروع تایپ

        // پاکسازی تایمرها در صورت خروج از کامپوننت یا رندر مجدد
        return () => clearTimeout(timeoutId);
    }, [onComplete]);

    return (
        <SplashContainer>
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1.2 }}
                transition={{ duration: 2, ease: 'easeOut' }}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '30px',
                }}
            >
                <Logo
                    src={logo}
                    alt="Medogram Logo"
                    style={{ width: '150px', height: '150px' }}
                />
            </motion.div>
            <Text
                as={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.5, duration: 2, ease: 'easeOut' }}
                style={{
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    color: '#4A90E2',
                    textShadow: '2px 2px 10px rgba(0, 0, 0, 0.3)',
                }}
            >
                {text}
            </Text>
            <SubText
                as={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4.5, duration: 2.5, ease: 'easeOut' }}
                style={{
                    fontSize: '1.5rem',
                    color: '#333',
                    marginTop: '15px',
                    textShadow: '1px 1px 5px rgba(0, 0, 0, 0.2)',
                }}
            >
                Smart Clinic
            </SubText>
        </SplashContainer>
    );
};

export default SplashScreen;
