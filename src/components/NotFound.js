import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, keyframes } from '@mui/material';
import { styled } from '@mui/system';

const float = keyframes`
    0% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
    100% { transform: translateY(0px) rotate(0deg); }
`;
const shine = keyframes`
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
`;

const particleAnimation = keyframes`
    0% { transform: translateY(0) rotate(0deg); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateY(-1000%) rotate(720deg); opacity: 0; }
`;

const AnimatedSVG = styled('svg')`
    animation: ${float} 6s ease-in-out infinite;
    filter: drop-shadow(0 0 15px rgba(0, 255, 249, 0.5));
`;

const ParticleContainer = styled(Box)`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
`;

const Particle = styled(Box)`
  position: absolute;
  width: 10px;
  height: 10px;
  background: ${props => props.color};
  border-radius: 50%;
  animation: ${particleAnimation} ${props => props.duration}s linear infinite;
  animation-delay: ${props => props.delay}s;
  left: ${props => props.left}%;
`;

const GlitchText = styled(Typography)`
  position: relative;
  text-shadow: 0 0 20px rgba(255, 0, 193, 0.5);
  
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

const StyledButton = styled(Button)`
  position: relative;
  overflow: hidden;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 249, 0.2), transparent);
  background-size: 200% 100%;
  animation: ${shine} 3s infinite;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(0, 255, 249, 0.5);
  }
`;

const NotFound = () => {
    const particles = Array.from({ length: 20 }).map((_, index) => ({
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
        color: index % 2 === 0 ? '#ff00c1' : '#00fff9'
    }));

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                textAlign: 'center',
                backgroundColor: '#0a0a0a',
                color: '#fff',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            <ParticleContainer>
                {particles.map((particle, index) => (
                    <Particle
                        key={index}
                        left={particle.left}
                        delay={particle.delay}
                        duration={particle.duration}
                        color={particle.color}
                    />
                ))}
            </ParticleContainer>

            <AnimatedSVG width="300" height="300" viewBox="0 0 200 200">
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3f51b5" />
                        <stop offset="50%" stopColor="#ff00c1" />
                        <stop offset="100%" stopColor="#00fff9" />
                    </linearGradient>
                </defs>
                <circle cx="100" cy="100" r="90" fill="none" stroke="url(#gradient)" strokeWidth="10" />
                <path d="M60,100 Q100,40 140,100 T220,100" fill="none" stroke="#ff00c1" strokeWidth="5">
                    <animate attributeName="d" dur="3s" repeatCount="indefinite"
                             values="M60,100 Q100,40 140,100 T220,100;
                                M60,100 Q100,60 140,100 T220,100;
                                M60,100 Q100,40 140,100 T220,100" />
                </path>
                <path d="M60,100 Q100,160 140,100 T220,100" fill="none" stroke="#00fff9" strokeWidth="5">
                    <animate attributeName="d" dur="3s" repeatCount="indefinite"
                             values="M60,100 Q100,160 140,100 T220,100;
                                M60,100 Q100,140 140,100 T220,100;
                                M60,100 Q100,160 140,100 T220,100" />
                </path>
            </AnimatedSVG>

            <GlitchText variant="h1" sx={{
                fontSize: { xs: '5rem', sm: '8rem' },
                fontWeight: 'bold',
                marginBottom: 2,
                fontFamily: '"Orbitron", sans-serif'
            }}>
                404
            </GlitchText>

            <Typography variant="h4" sx={{
                marginBottom: 2,
                color: '#00fff9',
                textShadow: '0 0 10px rgba(0, 255, 249, 0.5)',
                fontFamily: '"Orbitron", sans-serif'
            }}>
                اوه! صفحه مورد نظر یافت نشد
            </Typography>

            <Typography variant="body1" sx={{
                marginBottom: 4,
                maxWidth: '600px',
                color: '#ccc',
                px: 2
            }}>
                متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا حذف شده است. لطفاً مطمئن شوید که آدرس را درست وارد کرده‌اید یا به صفحه اصلی بازگردید.
            </Typography>

            <StyledButton
                component={Link}
                to="/"
                variant="outlined"
                sx={{
                    color: '#00fff9',
                    borderColor: '#00fff9',
                    padding: '10px 30px',
                    fontSize: '1.1rem',
                    zIndex: 1,
                    '&:hover': {
                        backgroundColor: 'rgba(0, 255, 249, 0.1)',
                        borderColor: '#00fff9',
                    }
                }}
            >
                بازگشت به صفحه اصلی
            </StyledButton>
        </Box>
    );
};

export default NotFound;