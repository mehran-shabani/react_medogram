// src/components/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, keyframes } from '@mui/material';
import { styled } from '@mui/system';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const AnimatedSVG = styled('svg')`
  animation: ${float} 3s ease-in-out infinite;
`;

const GlitchText = styled(Typography)`
  position: relative;
  
  &:before,
  &:after {
    content: '404';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &:before {
    left: 2px;
    text-shadow: -2px 0 #ff00c1;
    clip: rect(24px, 550px, 90px, 0);
    animation: glitch-anim 3s infinite linear alternate-reverse;
  }

  &:after {
    left: -2px;
    text-shadow: -2px 0 #00fff9, 2px 2px #ff00c1;
    clip: rect(85px, 550px, 140px, 0);
    animation: glitch-anim 2s infinite linear alternate-reverse;
  }

  @keyframes glitch-anim {
    0% { clip: rect(134px, 9999px, 52px, 0); }
    5% { clip: rect(22px, 9999px, 147px, 0); }
    10% { clip: rect(55px, 9999px, 89px, 0); }
    15% { clip: rect(111px, 9999px, 8px, 0); }
    20% { clip: rect(133px, 9999px, 96px, 0); }
    25% { clip: rect(0px, 9999px, 13px, 0); }
    30% { clip: rect(36px, 9999px, 138px, 0); }
    35% { clip: rect(61px, 9999px, 30px, 0); }
    40% { clip: rect(128px, 9999px, 74px, 0); }
    45% { clip: rect(109px, 9999px, 90px, 0); }
    50% { clip: rect(27px, 9999px, 128px, 0); }
    55% { clip: rect(24px, 9999px, 84px, 0); }
    60% { clip: rect(73px, 9999px, 50px, 0); }
    65% { clip: rect(140px, 9999px, 144px, 0); }
    70% { clip: rect(142px, 9999px, 21px, 0); }
    75% { clip: rect(39px, 9999px, 124px, 0); }
    80% { clip: rect(6px, 9999px, 85px, 0); }
    85% { clip: rect(87px, 9999px, 82px, 0); }
    90% { clip: rect(6px, 9999px, 128px, 0); }
    95% { clip: rect(10px, 9999px, 86px, 0); }
    100% { clip: rect(104px, 9999px, 138px, 0); }
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
                backgroundColor: '#111',
                color: '#fff',
                overflow: 'hidden',
            }}
        >
            <AnimatedSVG width="200" height="200" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="90" fill="none" stroke="#3f51b5" strokeWidth="10" />
                <path d="M60,100 Q100,40 140,100 T220,100" fill="none" stroke="#ff00c1" strokeWidth="5" />
                <path d="M60,100 Q100,160 140,100 T220,100" fill="none" stroke="#00fff9" strokeWidth="5" />
            </AnimatedSVG>

            <GlitchText variant="h1" sx={{ fontSize: '8rem', fontWeight: 'bold', marginBottom: 2 }}>
                404
            </GlitchText>

            <Typography variant="h4" sx={{ marginBottom: 2, color: '#00fff9' }}>
                اوه! صفحه مورد نظر یافت نشد
            </Typography>

            <Typography variant="body1" sx={{ marginBottom: 4, maxWidth: '600px', color: '#ccc' }}>
                متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا حذف شده است. لطفاً مطمئن شوید که آدرس را درست وارد کرده‌اید یا به صفحه اصلی بازگردید.
            </Typography>

            <Button
                component={Link}
                to="/"
                variant="outlined"
                sx={{
                    color: '#00fff9',
                    borderColor: '#00fff9',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 255, 249, 0.1)',
                        borderColor: '#00fff9',
                    }
                }}
            >
                بازگشت به صفحه اصلی
            </Button>
        </Box>
    );
};

export default NotFound;