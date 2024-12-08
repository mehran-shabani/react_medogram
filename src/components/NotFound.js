import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, keyframes } from '@mui/material';
import { styled } from '@mui/system';

const float = keyframes`
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
`;

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

const AnimatedSVG = styled('svg')`
    animation: ${float} 3s ease-in-out infinite;
`;

const GlitchText = styled(Typography)`
    position: relative;
    font-size: 8rem;
    font-weight: bold;
    text-transform: uppercase;

    &:before,
    &:after {
        content: '404';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        color: #ff00c1;
        opacity: 0.75;
    }

    &:before {
        transform: translate(-3px, -3px);
    }

    &:after {
        transform: translate(3px, 3px);
        color: #00fff9;
    }

    animation: glitch 1s infinite;
    @keyframes glitch {
        0% { transform: translate(0); }
        25% { transform: translate(2px, -2px); }
        50% { transform: translate(-2px, 2px); }
        75% { transform: translate(3px, -3px); }
        100% { transform: translate(0); }
    }
`;

const StyledButton = styled(Button)`
    color: #fff;
    border-color: #00fff9;
    transition: 0.3s;

    &:hover {
        background: rgba(0, 255, 249, 0.2);
        box-shadow: 0 0 15px #00fff9;
        border-color: #ff00c1;
    }
`;

const NotFound = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
                color: '#fff',
                overflow: 'hidden',
                background: 'linear-gradient(-45deg, #3f51b5, #ff00c1, #00fff9, #111)',
                backgroundSize: '400% 400%',
                animation: `${gradientAnimation} 10s ease infinite`,
            }}
        >
            <AnimatedSVG width="200" height="200" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="90" fill="none" stroke="#3f51b5" strokeWidth="10" />
                <path
                    d="M60,100 Q100,40 140,100 T220,100"
                    fill="none"
                    stroke="#ff00c1"
                    strokeWidth="5"
                    style={{
                        animation: 'dash 2s ease-in-out infinite',
                        strokeDasharray: 300,
                        strokeDashoffset: 600,
                    }}
                />
                <path
                    d="M60,100 Q100,160 140,100 T220,100"
                    fill="none"
                    stroke="#00fff9"
                    strokeWidth="5"
                    style={{
                        animation: 'dash 3s ease-in-out infinite',
                        strokeDasharray: 300,
                        strokeDashoffset: 600,
                    }}
                />
            </AnimatedSVG>

            <GlitchText variant="h1">404</GlitchText>

            <Typography
                variant="h4"
                sx={{
                    marginBottom: 2,
                    color: '#00fff9',
                    textShadow: '0 0 15px rgba(0, 255, 249, 0.5)',
                }}
            >
                اوه! صفحه مورد نظر یافت نشد
            </Typography>

            <Typography
                variant="body1"
                sx={{
                    marginBottom: 4,
                    maxWidth: '600px',
                    color: '#ccc',
                }}
            >
                متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا حذف شده است. لطفاً مطمئن شوید که آدرس را درست وارد کرده‌اید یا به صفحه اصلی بازگردید.
            </Typography>

            <StyledButton component={Link} to="/" variant="outlined">
                بازگشت به صفحه اصلی
            </StyledButton>
        </Box>
    );
};

export default NotFound;
