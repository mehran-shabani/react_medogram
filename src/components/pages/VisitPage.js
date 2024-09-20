import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Visit from '../Visit/Visit';
import { devices } from '../../styles/media';

const PageBackground = styled.div`
    min-height: 100vh;
    
    background: linear-gradient(135deg, #e0f7fa 0%, #80deea 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
`;

const ContentWrapper = styled(motion.div)`
    background: white;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    width: 100%;
    max-width: 800px;
    

    @media ${devices.tablet} {
        padding: 3rem;
    }

    @media ${devices.laptop} {
        max-width: 1000px;
    }
`;

const Header = styled.header`
    text-align: center;
    margin-bottom: 2rem;
`;

const Title = styled.h1`
    font-size: 2rem;
    color: #00838f;
    margin-bottom: 1rem;

    @media ${devices.tablet} {
        font-size: 2.5rem;
    }
`;

const Subtitle = styled.p`
    font-size: 1rem;
    color: #4a4a4a;

    @media ${devices.tablet} {
        font-size: 1.2rem;
    }
`;

const VisitPage = () => {
    return (
        <PageBackground>
            <ContentWrapper
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Header>
                    <Title>Schedule Your Visit</Title>
                    <Subtitle>Book an appointment with our healthcare professionals</Subtitle>
                </Header>
                <Visit />
            </ContentWrapper>
        </PageBackground>
    );
};

export default VisitPage;