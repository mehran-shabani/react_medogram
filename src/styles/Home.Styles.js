import styled, { keyframes } from 'styled-components';

// Define keyframes for animations
const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const moveUp = keyframes`
    from {
        transform: translateY(20px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
`;

export const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-image: url('https://example.com/background-image.jpg');  // Replace with your own image URL
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    padding: 4rem;
    min-height: 100vh;
    color: white;
    animation: ${fadeIn} 2s ease-in-out;
    backdrop-filter: blur(10px);
    background-color: rgba(0, 0, 0, 0.5); // Darkened overlay
`;

export const Title = styled.h1`
    font-size: 3rem;
    margin-bottom: 1.5rem;
    background: linear-gradient(90deg, #80bdff, #007bff); // Gradient with Light Blue and Primary Blue
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${moveUp} 1s ease-in-out;
`;

export const Description = styled.p`
    font-size: 1.4rem;
    margin-bottom: 2rem;
    max-width: 800px;
    color: #f1f9ff; // Very Light Blue
    animation: ${moveUp} 1.5s ease-in-out;
`;
