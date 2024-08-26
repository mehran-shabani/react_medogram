import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
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

const Description = styled.p`
    font-size: 1.2rem;
    color: #555;
    max-width: 800px;
    margin: 0 auto 2rem;
`;

const About = () => {
    return (
        <AboutContainer>
            <Title>درباره ما</Title>
            <Description>
                ما در مدوگرام با استفاده از تکنولوژی‌های پیشرفته و الگوریتم‌های هوشمند، به دنبال ارائه بهترین خدمات پزشکی به صورت آنلاین و تلفنی هستیم. ما تلاش می‌کنیم تا با کاهش هزینه‌ها و افزایش دسترسی به خدمات پزشکی، بهترین مراقبت‌ها را به تمامی افراد جامعه ارائه دهیم.
            </Description>
        </AboutContainer>
    );
};

export default About;
