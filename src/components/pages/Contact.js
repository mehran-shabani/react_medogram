import React from 'react';
import styled from 'styled-components';

const ContactContainer = styled.div`
    padding: 2rem;
    text-align: center;
    background-color: #f5f5f5;
    min-height: 100vh;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 1rem;
`;

const ContactDetails = styled.p`
    font-size: 1.2rem;
    color: #555;
    max-width: 800px;
    margin: 0 auto 2rem;
`;

const Contact = () => {
    return (
        <ContactContainer>
            <Title>تماس با ما</Title>
            <ContactDetails>
                برای اطلاعات بیشتر و دریافت خدمات پزشکی، با ما در تماس باشید:
            </ContactDetails>
            <ContactDetails>
                تلفن: 123-456-7890
            </ContactDetails>
            <ContactDetails>
                ایمیل: info@medogram.com
            </ContactDetails>
        </ContactContainer>
    );
};

export default Contact;
